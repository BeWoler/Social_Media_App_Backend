import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";

export class PostResponseDTO {
  @ApiProperty({ example: '13wekgmekm' })
  id: string;

  @ApiProperty({ example: {
    id: "dfrgm34-34mgkfmv4-3kfmk",
    email: "any@gmail.com",
    name: "Aleksei"
  } })
  user: User;

  @ApiProperty({ example: 'Post Content' })
  content: string;

  @ApiProperty({ example: 'Post Title' })
  title: string;

  @ApiProperty({ example: 32 })
  likesCount: number;

  @ApiProperty({ example: '22-11-23T22:00:00Z' })
  createdAt: Date;
}
