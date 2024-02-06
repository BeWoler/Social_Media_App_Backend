import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
