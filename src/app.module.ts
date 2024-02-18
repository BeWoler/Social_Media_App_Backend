import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/entities/post.entity';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthModule } from './modules/auth/auth.module';
import { Auth } from './modules/auth/entities/auth.entity';

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
      entities: [Post, User, Auth],
      database: process.env.PG_DB,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    PostModule,
    UserModule
  ],
  providers: [AuthService, JwtStrategy]
})
export class AppModule {}
