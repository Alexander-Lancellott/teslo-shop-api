import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ProductImage, Product } from './entities';
import { SeedProduct } from '../seed/data/seed-data';
import { User } from '../auth/entities/user.entity';
export declare class ProductsService {
    private readonly productRepository;
    private readonly productImageRepository;
    private readonly dataSource;
    private readonly helper;
    private handlerProduct;
    constructor(productRepository: Repository<Product>, productImageRepository: Repository<ProductImage>, dataSource: DataSource);
    create(createProductDto: CreateProductDto, user: User): Promise<{
        images: string[] | (string[] & ProductImage[]);
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
        user: User;
        creatAt: Date;
        updateAt: Date;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        total: number;
        totalPages: number;
        page: number;
        products: Product[];
    }>;
    findOne(term: string, termType?: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto, user: User): Promise<Product>;
    remove(id: string, user: User): Promise<Product>;
    deleteAllProducts(hard?: boolean, product?: SeedProduct[]): Promise<void>;
}
