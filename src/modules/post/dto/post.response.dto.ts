import { ApiProperty } from "@nestjs/swagger";

export class PostResponseDTO {
  @ApiProperty({ example: '13wekgmekm' })
  id: string;

  @ApiProperty({ example: 'Misha' })
  author: string;

  @ApiProperty({ example: 'Post Content' })
  content: string;

  @ApiProperty({ example: 'Post Title' })
  title: string;

  @ApiProperty({ example: '22-11-23T22:00:00Z' })
  createdAt: Date;
}
