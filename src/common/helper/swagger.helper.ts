import { createWriteStream } from 'fs';
import { get } from 'http';

export const updateDoc = (trigger: boolean, port: number) => {
  if (trigger) {
    get(
      `http://localhost:${port}/doc/swagger-ui-bundle.js`,
      function (response) {
        response.pipe(createWriteStream('public/doc/swagger-ui-bundle.js'));
        console.log(
          `Swagger UI bundle file written to: '/public/doc/swagger-ui-bundle.js'`,
        );
      },
    );

    get(`http://localhost:${port}/doc/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('public/doc/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/public/doc/swagger-ui-init.js'`,
      );
    });

    get(
      `http://localhost:${port}/doc/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('public/doc/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/public/doc/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`http://localhost:${port}/doc/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('public/doc/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/public/doc/swagger-ui.css'`,
      );
    });
  }
};
