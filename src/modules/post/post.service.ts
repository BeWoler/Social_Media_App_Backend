import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { PostRequestDTO } from "./dto/post.request.dto";
import { log } from "console";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  createPost(postRequestDto: PostRequestDTO): Promise<Post> {
    const post: Post = new Post();

    post.author = postRequestDto.author
    post.title = postRequestDto.title
    post.content = postRequestDto.content
    post.createdAt = new Date();

    return this.postRepository.save(post);
  }

  getAllPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  getPostById(id: string): Promise<Post> {
    log(id)
    return this.postRepository.findOneBy({ id });
  }

  removePostById(id: string): Promise<{ affected?: number }> {
    return this.postRepository.delete({ id });
  }
}
