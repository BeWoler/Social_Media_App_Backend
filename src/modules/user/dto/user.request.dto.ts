import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRequestDTO {
  @ApiProperty({ example: 'any@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'anyusername', required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Michael', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ example: 'anypass', required: true })
  @IsString()
  password: string; 

  @ApiProperty({ example: 'https://avatars.githubusercontent.com', required: false })
  @IsNotEmpty()
  @IsString()
  image?: string;
}
