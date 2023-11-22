import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { PostRequestDTO } from "./dto/post.request.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(postRequestDto: PostRequestDTO): Promise<Post> {
    const post: Post = new Post();

    post.author = postRequestDto.author
    post.title = postRequestDto.title
    post.content = postRequestDto.content
    post.createdAt = new Date();

    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostById(id: string): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }

  async removePostById(id: string): Promise<{ affected?: number }> {
    return this.postRepository.delete({ id });
  }
}
