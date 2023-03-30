import { Product } from '../entities/product.entity';
declare class CreateProduct {
    title: string;
    price?: number;
    description?: string;
    slug?: string;
    stock?: number;
    sizes: string[];
    gender: string;
    tags?: string[];
    images?: string[];
}
declare const CreateProductDto_base: import("@nestjs/mapped-types").MappedType<CreateProduct & Omit<Product, "id" | "user" | "creatAt" | "updateAt" | "checkSlugInsert">>;
export declare class CreateProductDto extends CreateProductDto_base {
}
export {};
