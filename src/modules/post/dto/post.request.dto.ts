import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

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
  content: string;

  @ApiProperty({ example: 'Misha', required: true })
  @IsString()
  @IsNotEmpty()
  author: string;
}
