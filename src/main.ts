import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://127.0.0.1:5173'], // Permitir solicitudes solo desde http://localhost:3001
    methods: 'GET,HEAD,,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  });
  await app.listen(3000);
}
bootstrap();
