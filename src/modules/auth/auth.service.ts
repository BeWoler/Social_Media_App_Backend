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

    const userDTO = new UserResponseDTO(user);
    await this.userRepository.save(user);

    return userDTO;
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
      const payload: AuthDTO = { email, password: authCredentialsDto.password, id: user.id };
      const accessToken: string = this.jwtService.sign(payload);

      const userDTO: UserResponseDTO = new UserResponseDTO(user);

      return { user: userDTO, accessToken };
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }

  async verifyToken(id: string, token: string): Promise<{ user: UserResponseDTO, verified: boolean }> {
    const user = await this.userRepository.findOneBy({ id })
    if(user && token) {
      const isVerified = await this.jwtService.verify(token, { secret: process.env.JWT_SECRET})
      if(isVerified) {
        const userDTO: UserResponseDTO = new UserResponseDTO(user);
        return { user: userDTO, verified: true}
      }
    }
    else false
  }
}
