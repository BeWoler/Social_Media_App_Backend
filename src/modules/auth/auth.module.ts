import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtFactory } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Auth]),
    JwtModule.registerAsync(jwtFactory),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [TypeOrmModule.forFeature([User]), JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule {}
