import { MigrationInterface, QueryRunner } from 'typeorm';

export const ENTITIES_NAME = {
  Product: { prev: 'product', current: 'products' },
  ProductImage: { prev: 'product_image', current: 'product_images' },
};

export class RenameEntities1678662448088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${ENTITIES_NAME.Product.prev} RENAME TO ${ENTITIES_NAME.Product.current}`,
    );
    await queryRunner.query(
      `ALTER TABLE ${ENTITIES_NAME.ProductImage.prev} RENAME TO ${ENTITIES_NAME.ProductImage.current}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${ENTITIES_NAME.Product.current} RENAME TO ${ENTITIES_NAME.Product.prev}`,
    );
    await queryRunner.query(
      `ALTER TABLE ${ENTITIES_NAME.ProductImage.current} RENAME TO ${ENTITIES_NAME.ProductImage.prev}`,
    );
  }
}
