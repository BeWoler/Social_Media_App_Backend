import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDTO {
  @ApiProperty({ example: '13wekgmekm' })
  id: string;

  @ApiProperty({ example: 'any@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Michael' })
  name: string;

  @ApiProperty({ example: 'github' })
  provider: string;

  @ApiProperty({ example: 'https://avatars.githubusercontent.com' })
  image: string;
}
