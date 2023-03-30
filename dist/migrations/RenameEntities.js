"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameEntities1678662448088 = exports.ENTITIES_NAME = void 0;
exports.ENTITIES_NAME = {
    Product: { prev: 'product', current: 'products' },
    ProductImage: { prev: 'product_image', current: 'product_images' },
};
class RenameEntities1678662448088 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE ${exports.ENTITIES_NAME.Product.prev} RENAME TO ${exports.ENTITIES_NAME.Product.current}`);
        await queryRunner.query(`ALTER TABLE ${exports.ENTITIES_NAME.ProductImage.prev} RENAME TO ${exports.ENTITIES_NAME.ProductImage.current}`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE ${exports.ENTITIES_NAME.Product.current} RENAME TO ${exports.ENTITIES_NAME.Product.prev}`);
        await queryRunner.query(`ALTER TABLE ${exports.ENTITIES_NAME.ProductImage.current} RENAME TO ${exports.ENTITIES_NAME.ProductImage.prev}`);
    }
}
exports.RenameEntities1678662448088 = RenameEntities1678662448088;
//# sourceMappingURL=RenameEntities.js.map