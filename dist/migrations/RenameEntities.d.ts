import { MigrationInterface, QueryRunner } from 'typeorm';
export declare const ENTITIES_NAME: {
    Product: {
        prev: string;
        current: string;
    };
    ProductImage: {
        prev: string;
        current: string;
    };
};
export declare class RenameEntities1678662448088 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
