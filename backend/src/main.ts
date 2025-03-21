import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Cities API')
    .setDescription(
      'API for managing cities with filtering, sorting, and pagination',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(3000);
  console.log('🚀 Server is running on http://localhost:3000');
  console.log('📄 Swagger API docs available at http://localhost:3000/api');
}
bootstrap();
