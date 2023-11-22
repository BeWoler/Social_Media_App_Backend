import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRequestDTO {
  @ApiProperty({ example: 'any@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Michael', required: false })
  @IsString()
  name?: string; 

  @ApiProperty({ example: 'newPassword123', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
