import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { User } from '../auth/entities/user.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, user: User): Promise<{
        images: string[] | (string[] & import("./entities").ProductImage[]);
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
        products: import("./entities").Product[];
    }>;
    findOne(term: string): Promise<import("./entities").Product>;
    update(id: string, updateProductDto: UpdateProductDto, user: User): Promise<import("./entities").Product>;
    remove(id: string, user: User): Promise<import("./entities").Product>;
}
