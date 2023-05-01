import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { updateDoc } from './common/helper/swagger.helper';

const parseAppUrl = async (app: INestApplication) => {
  const url = await app.getUrl();
  return url.replace(/\[::1]|127.0.0.1/, 'localhost');
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = configService.get<number>('PORT');
  const swaggerUpdate = configService.get<boolean>('SWAGGER_UPDATE');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Teslo-shop API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    customCssUrl: '/css/custom.css',
  });
  await app.listen(port);
  logger.log(`App is running on: ${await parseAppUrl(app)}`);
  updateDoc(swaggerUpdate, port);
}
bootstrap();
