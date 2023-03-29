import { Transform } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { ENTITIES_NAME } from '../../migrations/RenameEntities';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { initialData } from '../../seed/data/seed-data';

const cleanSlug = (slug: string) => {
  return slug.toLowerCase().replaceAll(' ', '_').replaceAll(/'|`/g, '');
};

export const gender = ['men', 'women', 'kid', 'unisex'];

@Entity({ name: ENTITIES_NAME.Product.current })
export class Product {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: initialData.products[0].title, uniqueItems: true })
  @Column('text', { unique: true })
  title: string;

  @ApiProperty({ example: 99.99 })
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty({ example: initialData.products[0].description })
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty({ example: initialData.products[0].slug })
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty({ type: 'interger', example: initialData.products[0].stock })
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty({ example: initialData.products[0].sizes })
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty({
    example: initialData.products[0].gender,
    enum: gender,
  })
  @Column('text')
  gender: string;

  @ApiProperty({ example: initialData.products[0].tags })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    isArray: true,
    type: 'string',
    example: initialData.products[0].images,
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  @Transform(({ value }) => {
    return value.map((image: ProductImage) => image.url);
  })
  images?: ProductImage[] | string[];

  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @CreateDateColumn()
  creatAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = cleanSlug(this.slug);
  }
}
