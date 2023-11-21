import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PORT,
      password: process.env.PG_PASSWORD,
      username: process.env.PG_USERNAME,
      entities: [],
      database: process.env.PG_DB,
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
