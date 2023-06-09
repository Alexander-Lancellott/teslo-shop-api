import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Product } from './product.entity';
import { ENTITIES_NAME } from '../../migrations/RenameEntities';

@Entity({ name: ENTITIES_NAME.ProductImage.current })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @RelationId('product')
  product: Product | string;
}
