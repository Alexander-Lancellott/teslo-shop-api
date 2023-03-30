import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities';
import { initialData } from '../../seed/data/seed-data';
import { ValidRoles } from '../interfaces';

@Entity('users')
export class User {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: initialData.users[1].email })
  @Column('text', { unique: true })
  email: string;

  @ApiHideProperty()
  @Column('text', { select: false })
  password: string;

  @ApiProperty({ example: initialData.users[1].fullName })
  @Column('text')
  fullName: string;

  @Column('boolean', { default: true })
  isActive: boolean;

  @ApiProperty({ example: initialData.users[1].roles })
  @Column('text', { array: true, default: [ValidRoles.user] })
  roles: string[];

  @ApiHideProperty()
  @OneToMany(() => Product, (product) => product.user)
  products: Product;

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email = this.email.toLowerCase();
    this.fullName = this.fullName.trim();
  }
}
