import { ApiProperty } from "@nestjs/swagger";
import { Post } from "../entities/post.entity";
import { UserResponseDTO } from "src/modules/user/dto/user.response.dto";

export class PostResponseDTO {
  @ApiProperty({ example: '13wekgmekm' })
  id: string;

  @ApiProperty({ example: {
    id: "dfrgm34-34mgkfmv4-3kfmk",
    email: "any@gmail.com",
    name: "Aleksei"
  } })
  user: UserResponseDTO;

  @ApiProperty({ example: 'Post Content' })
  description: string;

  @ApiProperty({ example: 'Post Title' })
  title: string;

  @ApiProperty({ example: '22-11-23T22:00:00Z' })
  createdAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.user = post.user;
    this.description = post.description;
    this.title = post.title;
    this.createdAt = post.createdAt;
  }
}
