import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { AuthDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDTO } from '../user/dto/user.response.dto';
import { UserRequestDTO } from '../user/dto/user.request.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(userRequestDto: UserRequestDTO): Promise<UserResponseDTO> {

    if(!userRequestDto.email || !userRequestDto.password || !userRequestDto.username) {
      throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
    }
    
    const existingEmail = await this.userRepository.findOneBy({
      email: userRequestDto.email,
    });

    const existingUsername = await this.userRepository.findOneBy({
      username: userRequestDto.username,
    });

    if (existingEmail) {
      throw new HttpException('Email already exist!', HttpStatus.BAD_REQUEST);
    }

    if (existingUsername) {
      throw new HttpException(
        'Username already exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = new User();

    user.email = userRequestDto.email;
    user.username = userRequestDto.username;
    user.password = await bcrypt.hash(userRequestDto.password, 10);

    const userDTO = new UserResponseDTO(user);
    await this.userRepository.save(user);

    return userDTO;
  }

  async signin(
    authCredentialsDto: AuthDTO,
  ): Promise<{ user: UserResponseDTO; accessToken: string }> {
    const email: string = authCredentialsDto.email;
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials!');
    }

    const isCorrectPassword = await bcrypt.compare(
      authCredentialsDto.password,
      user.password,
    );

    if (user && isCorrectPassword) {
      const payload: AuthDTO = {
        email,
        password: authCredentialsDto.password,
        id: user.id,
      };
      const accessToken: string = this.jwtService.sign(payload);

      const userDTO: UserResponseDTO = new UserResponseDTO(user);

      const data = { user: userDTO, accessToken: accessToken };

      await this.authRepository.save(data);

      return { user: userDTO, accessToken };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }

  async logout(token: string): Promise<void> {
    await this.authRepository.delete({ accessToken: token });
  }

  async verifyToken(
    token: string,
  ): Promise<{ user: UserResponseDTO; accessToken: string } | boolean> {
    if(!token) return false;

    const userAuth = await this.authRepository.findOne({
      where: { accessToken: token },
      relations: ['user'],
    });
    if (userAuth) {
      const isVerified = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (isVerified) {
        const userDTO: UserResponseDTO = new UserResponseDTO(userAuth.user);
        return { user: userDTO, accessToken: token };
      }
    } else {
      await this.logout(token);
      return false;
    }
  }
}
