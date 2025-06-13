import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // <-- Carga las variables del .env

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Secure Chat API')
    .setDescription('API para comunicación cifrada punto a punto')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
