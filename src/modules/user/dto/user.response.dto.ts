import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDTO {
  @ApiProperty({ example: '13wekgmekm' })
  id: string;

  @ApiProperty({ example: 'any@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Michael' })
  name: string;

  @ApiProperty({ example: 'https://avatars.githubusercontent.com' })
  image: string;

  constructor(user: UserResponseDTO) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.image = user.image;
  }
}
