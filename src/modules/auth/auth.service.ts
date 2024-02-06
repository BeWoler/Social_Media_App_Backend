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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(userRequestDto: UserRequestDTO): Promise<UserResponseDTO> {
    const existingEmail = await this.userRepository.findOneBy({
      email: userRequestDto.email,
    });

    if (existingEmail) {
      throw new HttpException('Email already exist!', HttpStatus.BAD_REQUEST);
    }

    const user: User = new User();

    user.email = userRequestDto.email;
    user.password = await bcrypt.hash(userRequestDto.password, 10);

    return this.userRepository.save(user);
  }

  async signin(
    authCredentialsDto: AuthDTO,
  ): Promise<{ user: UserResponseDTO; accessToken: string }> {
    const email: string = authCredentialsDto.email;
    const user = await this.userRepository.findOneBy({ email });
    const isCorrectPassword = await bcrypt.compare(
      authCredentialsDto.password,
      user.password,
    );
    if (user && isCorrectPassword) {
      const payload: AuthDTO = { email, password: authCredentialsDto.password };
      const accessToken: string = this.jwtService.sign(payload);
      return { user: { ...user, password: null }, accessToken };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }
}
