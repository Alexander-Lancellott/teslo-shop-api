import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ProductImage, Product } from './entities';
import { SeedProduct } from '../seed/data/seed-data';
import { ENTITIES_NAME } from '../migrations/RenameEntities';
import { Helper } from '../common/helper/helper';
import { User } from '../auth/entities/user.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductsService {
  private readonly helper = new Helper('ProductsService');

  private handlerProduct = (
    images?: string[],
    createProductDto?: CreateProductDto,
    user?: User,
  ) => {
    let productImages: ProductImage[] = [];
    if (images) {
      productImages = images.map((image) =>
        this.productImageRepository.create({ url: image }),
      );
    }

    return {
      images: productImages,
      ...createProductDto,
      user,
    };
  };

  private formatImages(images: ProductImage[] = []) {
    const newImages = [];
    if (images.length > 0) images.forEach((image) => newImages.push(image.url));
    return newImages;
  }

  private formatProductResult(product: Product) {
    const images = this.formatImages(product.images);
    return { ...product, images };
  }

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly filesService: FilesService,

    private readonly dataSource: DataSource,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: User,
    images?: string[],
  ) {
    try {
      const product = this.productRepository.create({
        ...this.handlerProduct(images, createProductDto, user),
      });
      await this.productRepository.save(product);
      return this.formatProductResult(product);
    } catch (error) {
      this.helper.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      order: { creatAt: 'ASC' },
    });
    const total = await this.productRepository.count();
    const totalPages = Math.ceil(total / limit);

    return { total, totalPages, page, products };
  }

  async findOne(term: string, termType = 'id, title or slug') {
    let product: Product;

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('UPPER(title) = :title or slug = :slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .leftJoinAndSelect('prod.user', 'prodUser')
        .getOne();
    }

    if (!product)
      throw new NotFoundException(
        `Product with ${termType} '${term}' not found`,
      );

    return product;
  }

  async update({
    id,
    user,
    updateProductDto,
    uploadAll,
    deleteImages,
  }: {
    id: string;
    user: User;
    updateProductDto?: UpdateProductDto;
    uploadAll?: () => Promise<string[]>;
    deleteImages?: (secure_urls: string[]) => Promise<void>;
  }) {
    const product = await this.findOne(id, 'id');
    let images: string[];

    if (product.user.id !== user.id)
      throw new BadRequestException(`You can't perform this update.`);

    const updateProduct = this.productRepository.create({
      ...product,
      ...updateProductDto,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (uploadAll) images = await uploadAll();

      if (images) {
        const productImages = this.formatImages(product.images);
        await queryRunner.manager.delete(ProductImage, { product: id });
        await deleteImages(productImages);

        updateProduct.images = this.handlerProduct(images).images;
      }

      const result = await queryRunner.manager.save(updateProduct);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.formatProductResult(result);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      if (images) await deleteImages(images);
      this.helper.handleDBExceptions(error);
    }
  }

  async remove(id: string, user: User) {
    const product = await this.findOne(id, 'id');
    if (product.user.id !== user.id && !user.roles.includes('admin'))
      throw new BadRequestException(`You can't perform this delete.`);

    await this.productRepository.remove(product);
    await this.filesService.deleteImages(this.formatImages(product.images));

    return product;
  }

  async deleteAllProducts(hard = false, product?: SeedProduct[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    const titles = [];
    product.forEach(({ title }) => titles.push(title));

    /*const query = hard
      ? {
          value: 'DELETE FROM product',
          param: [],
        }
      : {
          value: `DELETE FROM product WHERE title in (${titles.map(
            (_, index) => `$${index + 1}`,
          )})`,
          param: titles,
        };*/

    try {
      //await queryRunner.manager.query(query.value, query.param);
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where(hard ? {} : 'title In(:...title)', { title: titles })
        .execute();
      if (hard) {
        await queryRunner.manager.query(
          `ALTER SEQUENCE ${ENTITIES_NAME.ProductImage.current}_id_seq RESTART 1`,
        );
        await this.filesService.deleteAll();
      }
      await queryRunner.commitTransaction();
      return await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.helper.handleDBExceptions(error);
    }
  }
}
