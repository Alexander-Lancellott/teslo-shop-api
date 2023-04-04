import { BadRequestException, Injectable } from '@nestjs/common';
import { SeedDto } from './dto/seed.dto';
import { ProductsService } from '../products/products.service';

import { initialData, SeedProduct, SeedUser } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private secret: string;
  private cloudinarySeedFolder: string;
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.secret = configService.getOrThrow('SECRET');
    this.cloudinarySeedFolder = configService.getOrThrow(
      'CLOUDINARY_SEED_FOLDER',
    );
  }

  async runSeed({ hard, secret }: SeedDto) {
    if (secret !== this.secret)
      throw new BadRequestException('First talk to the admin');

    const seedProducts = initialData.products;
    const seedUsers = initialData.users;

    await this.deleteTables(hard, seedProducts, seedUsers);
    const users = await this.insertUsers(seedUsers);
    await this.insertNewProducts(users[1], seedProducts);

    return {
      message: hard ? 'HARD SEED EXECUTED' : 'SEED EXECUTED',
    };
  }

  private async insertUsers(seedUsers: SeedUser[]) {
    const users: User[] = [];

    seedUsers.forEach(({ password, ...user }) => {
      users.push(
        this.userRepository.create({
          ...user,
          password: bcrypt.hashSync(password, 10),
        }),
      );
    });

    return await this.userRepository.save(users);
  }

  private async deleteTables(
    hard: boolean,
    seedProducts: SeedProduct[],
    seedUsers: SeedUser[],
  ) {
    await this.productsService.deleteAllProducts(hard, seedProducts);

    const usersEmail = [];
    seedUsers.forEach(({ email }) => usersEmail.push(email));

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where(hard ? {} : 'email In(:...email)', { email: usersEmail })
      .execute();
  }

  private async insertNewProducts(user: User, seedProducts: SeedProduct[]) {
    const insertPromises = [];

    seedProducts.forEach(({ images, ...restProducts }) => {
      const imagesUrl = [];
      images.forEach((image) =>
        imagesUrl.push(`${this.cloudinarySeedFolder}/${image}`),
      );
      insertPromises.push(
        this.productsService.create(restProducts, user, imagesUrl),
      );
    });

    return await Promise.all(insertPromises);
  }
}
