import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UserResponseDTO {
  @ApiProperty({ example: '13wekgmekm' })
  id: string;

  @ApiProperty({ example: 'any@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Michael' })
  name: string;

  @ApiProperty({ example: 'anypass' })
  @Exclude()
  password: string; 

  @ApiProperty({ example: 'https://avatars.githubusercontent.com' })
  image: string;
}
