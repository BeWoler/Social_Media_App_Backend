import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";

export class PostRequestDTO {
  @ApiProperty({ example: 'Post Title', required: true })
  @IsString()
  @MinLength(5, { message: 'Title must have atleast 5 characters.' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Post Content Lorem Ipsum...', required: true })
  @IsString()
  @MinLength(10, { message: 'Content must have atleast 10 characters.' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'dfdgdg40-dg345g-fgdf', required: true })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  user: User;

  createdAt: Date;

  constructor(post: PostRequestDTO) {
    this.title = post.title;
    this.description = post.description;
    this.user = post.user;
    this.createdAt = new Date();
  }
}
