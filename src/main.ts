import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { corsConfig } from './config/cors.config';
import { swaggerSetup } from './config/swagger.config';

async function bootstrap() {
  const PORT = process.env.APP_PORT

  const app = await NestFactory.create(AppModule);

  app.enableCors({...corsConfig})

  process.env.NODE_ENV !== 'prod' ? swaggerSetup(app) : null

  await app.listen(PORT).then(() => {
    log(`Server started at ${PORT} port`);
  });
}
bootstrap();
