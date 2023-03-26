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

const cleanSlug = (slug: string) => {
  return slug.toLowerCase().replaceAll(' ', '_').replaceAll(/'|`/g, '');
};

@Entity({ name: ENTITIES_NAME.Product.current })
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  title: string;

  @ApiProperty()
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty()
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty()
  @Column('text', { unique: true })
  slug: string;

  @ApiProperty()
  @Column('int', { default: 0 })
  stock: number;

  @ApiProperty()
  @Column('text', { array: true })
  sizes: string[];

  @ApiProperty()
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  @Transform(({ value }) => {
    return value.map((image: ProductImage) => image.url);
  })
  images?: ProductImage[];

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.products, { eager: true })
  user: User;

  @ApiProperty()
  @CreateDateColumn()
  creatAt: Date;

  @ApiProperty()
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
