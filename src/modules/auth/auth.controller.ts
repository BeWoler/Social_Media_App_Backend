import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { UserResponseDTO } from '../user/dto/user.response.dto';
import { UserRequestDTO } from '../user/dto/user.request.dto';
import { Response } from 'express';

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
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      res.cookie('accessToken', data.accessToken, {
        expires: expirationDate,
        sameSite: 'strict',
        httpOnly: true,
      });
    }
    res.send(data);
  }

  @Post('/signup')
  async signup(
    @Body() createUserDto: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    return this.authService.signup(createUserDto);
  }
}
