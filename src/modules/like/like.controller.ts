// import { Controller, Post, Param, Delete, Body } from "@nestjs/common";
// import { LikeService } from "./like.service";
// import { User } from "../user/entities/user.entity";

// @Controller('like')
// export class LikeController {
//   constructor(private readonly likeService: LikeService) {}

//   @Post(':postId')
//   async likePost(@Body() user: User, @Param('postId') postId: string): Promise<void> {
//     const post = await this.likeService.getPostById(postId);
//     await this.likeService.likePost(user, post);
//   }

//   @Delete(':postId')
//   async unlikePost(@Body() user: User, @Param('postId') postId: string): Promise<void> {
//     const post = await this.likeService.getPostById(postId);
//     await this.likeService.unlikePost(user, post);
//   }

// }
