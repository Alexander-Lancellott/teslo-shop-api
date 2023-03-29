import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class ProductsService {
  private readonly helper = new Helper('ProductsService');

  private handlerProduct = (
    images: string[],
    restProduct?: CreateProductDto,
    user?: User,
  ) => {
    const imagesDto = images.map((image) =>
      this.productImageRepository.create({ url: image }),
    );

    return {
      ...restProduct,
      images: imagesDto,
      user,
    };
  };

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const { images, ...restProduct } = createProductDto;

      const product = this.productRepository.create({
        ...this.handlerProduct(images, restProduct, user),
      });
      await this.productRepository.save(product);
      return { ...product, images };
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

  async update(id: string, updateProductDto: UpdateProductDto, user: User) {
    const { images, ...toUpdate } = updateProductDto;
    const product = await this.findOne(id, 'id');

    const updateProduct = this.productRepository.create({
      ...product,
      ...toUpdate,
      user,
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: id });

        updateProduct.images = this.handlerProduct(images).images;
      }

      const result = await queryRunner.manager.save(updateProduct);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.helper.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id, 'id');
    await this.productRepository.remove(product);

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
