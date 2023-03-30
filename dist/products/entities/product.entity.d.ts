import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';
export declare const gender: string[];
export declare class Product {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: string[];
    gender: string;
    tags: string[];
    images?: ProductImage[] | string[];
    user: User;
    creatAt: Date;
    updateAt: Date;
    checkSlugInsert(): void;
}
