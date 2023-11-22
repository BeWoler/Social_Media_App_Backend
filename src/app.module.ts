import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/entities/post.entity';
// import { LikeModule } from './modules/like/like.module';
// import { Like } from './modules/like/entities/like.entity';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

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
      entities: [Post, User],
      database: process.env.PG_DB,
      synchronize: true,
      logging: true,
    }),
    PostModule,
    // LikeModule,
    UserModule
  ],
})
export class AppModule {}
