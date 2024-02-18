import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { UserResponseDTO } from '../user/dto/user.response.dto';
import { UserRequestDTO } from '../user/dto/user.request.dto';
import { Request, Response } from 'express';
import { cookieConfig } from 'src/config/cookie.config';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(
    @Body() authCredentialsDto: AuthDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: UserResponseDTO; accessToken: string } | void> {
    const data = await this.authService.signin(authCredentialsDto);
    if (data.accessToken) {
      res.cookie('accessToken', data.accessToken, cookieConfig);
    }
    res.send(data);
  }

  @Post('/signup')
  async signup(
    @Body() createUserDto: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    return this.authService.signup(createUserDto);
  }

  @Delete('/logout')
  async logout(@Req() req: Request): Promise<void> {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(token);
  }

  @Post('/verify')
  async verify(
    @Req() req: Request,
  ): Promise<{ user: UserResponseDTO; accessToken: string } | boolean> {
    try {
      const token = req.headers.authorization.split(' ')[1];
      return this.authService.verifyToken(token);
    } catch (e) {
      throw new UnauthorizedException('Incorrect token!');
    }
  }
}
