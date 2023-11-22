// import { Injectable, NotFoundException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Like } from "./entities/like.entity";
// import { Repository } from "typeorm";
// import { Post } from "../post/entities/post.entity";
// import { User } from "../user/entities/user.entity";

// @Injectable()
// export class LikeService {
//   constructor(
//     @InjectRepository(Like) private readonly likeRepository: Repository<Like>
//   ) {}

//   async likePost(user: User, post: Post): Promise<void> {
//     const existingLike = await this.likeRepository.findOne({ user, post });

//     if(!existingLike) {
//       const newLike = this.likeRepository.create({ user, post});
//       await this.likeRepository.save(newLike);

//       post.likesCount++;

//       await this.likeRepository.manager.getRepository(Post).save(post)
//     }
//   }

//   async unlikePost(user: User, post: Post): Promise<void> {
//     const existingLike = await this.likeRepository.findOne({ user, post });

//     if (existingLike) {
//       await this.likeRepository.remove(existingLike);

//       post.likesCount--;

//       await this.likeRepository.manager.getRepository(Post).save(post);
//     }
//   }

//   async getPostById(postId: string): Promise<Post> {
//     const post = await this.likeRepository.manager.findOne(Post, postId);

//     if (!post) {
//       throw new NotFoundException(`Post with ID ${postId} not found`);
//     }

//     return post;
//   }
// }
