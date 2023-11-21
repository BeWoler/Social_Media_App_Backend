import { INestApplication } from '@nestjs/common/interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Social Media App')
    .setDescription('Social Media App API')
    .setVersion('1.0')
    // .addSecurity('bearer', {
    //   type: 'http',
    //   scheme: 'bearer',
    // })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
