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

    get(
      `http://localhost:${port}/doc/swagger-ui-bundle.js.map`,
      function (response) {
        response.pipe(createWriteStream('public/doc/swagger-ui-bundle.js.map'));
        console.log(
          `Swagger UI bundle file map written to: '/public/doc/swagger-ui-bundle.js.map'`,
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

    get(
      `http://localhost:${port}/doc/swagger-ui-standalone-preset.js.map`,
      function (response) {
        response.pipe(
          createWriteStream('public/doc/swagger-ui-standalone-preset.js.map'),
        );
        console.log(
          `Swagger UI standalone preset file map written to: '/public/doc/swagger-ui-standalone-preset.js.map'`,
        );
      },
    );

    get(`http://localhost:${port}/doc/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('public/doc/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/public/doc/swagger-ui.css'`,
      );
    });

    get(`http://localhost:${port}/doc/swagger-ui.css.map`, function (response) {
      response.pipe(createWriteStream('public/doc/swagger-ui.css.map'));
      console.log(
        `Swagger UI css file map written to: '/public/doc/swagger-ui.css.map'`,
      );
    });

    get(`http://localhost:${port}/doc/favicon-16x16.png`, function (response) {
      response.pipe(createWriteStream('public/doc/favicon-16x16.png'));
      console.log(
        `Favicon-16x16.png written to: '/public/doc/favicon-16x16.png'`,
      );
    });

    get(`http://localhost:${port}/doc/favicon-32x32.png`, function (response) {
      response.pipe(createWriteStream('public/doc/favicon-32x32.png'));
      console.log(
        `Favicon-32x32.png written to: '/public/doc/favicon-32x32.png'`,
      );
    });
  }
};
