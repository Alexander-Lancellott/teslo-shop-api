"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoc = void 0;
const fs_1 = require("fs");
const http_1 = require("http");
const updateDoc = (trigger, port) => {
    if (trigger) {
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui-bundle.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui-bundle.js'));
            console.log(`Swagger UI bundle file written to: '/public/doc/swagger-ui-bundle.js'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui-bundle.js.map`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui-bundle.js.map'));
            console.log(`Swagger UI bundle file map written to: '/public/doc/swagger-ui-bundle.js.map'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui-init.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui-init.js'));
            console.log(`Swagger UI init file written to: '/public/doc/swagger-ui-init.js'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui-standalone-preset.js`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui-standalone-preset.js'));
            console.log(`Swagger UI standalone preset file written to: '/public/doc/swagger-ui-standalone-preset.js'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui-standalone-preset.js.map`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui-standalone-preset.js.map'));
            console.log(`Swagger UI standalone preset file map written to: '/public/doc/swagger-ui-standalone-preset.js.map'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui.css`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui.css'));
            console.log(`Swagger UI css file written to: '/public/doc/swagger-ui.css'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/swagger-ui.css.map`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/swagger-ui.css.map'));
            console.log(`Swagger UI css file map written to: '/public/doc/swagger-ui.css.map'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/favicon-16x16.png`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/favicon-16x16.png'));
            console.log(`Favicon-16x16.png written to: '/public/doc/favicon-16x16.png'`);
        });
        (0, http_1.get)(`http://localhost:${port}/doc/favicon-32x32.png`, function (response) {
            response.pipe((0, fs_1.createWriteStream)('public/doc/favicon-32x32.png'));
            console.log(`Favicon-32x32.png written to: '/public/doc/favicon-32x32.png'`);
        });
    }
};
exports.updateDoc = updateDoc;
//# sourceMappingURL=swagger.helper.js.map