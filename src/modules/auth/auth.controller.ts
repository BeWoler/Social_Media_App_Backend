import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { UserResponseDTO } from '../user/dto/user.response.dto';
import { UserRequestDTO } from '../user/dto/user.request.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(
    @Body() authCredentialsDto: AuthDTO,
  ): Promise<{ user: UserResponseDTO, accessToken: string }> {
    return this.authService.signin(authCredentialsDto);
  }

  @Post('/signup')
  signup(@Body() createUserDto: UserRequestDTO): Promise<UserResponseDTO> {
    return this.authService.signup(createUserDto);
  }
}
