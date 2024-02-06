import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { corsConfig } from './config/cors.config';
import { swaggerSetup } from './config/swagger.config';
import { ConfigService } from '@nestjs/config/dist/config.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  const configService = app.get(ConfigService);
  
  const PORT = configService.get<number>('APP_PORT', 3000);

  app.enableCors({...corsConfig})

  process.env.NODE_ENV !== 'prod' ? swaggerSetup(app) : null

  await app.listen(PORT).then(() => {
    log(`Server started at ${PORT} port`);
  });
}
bootstrap();
