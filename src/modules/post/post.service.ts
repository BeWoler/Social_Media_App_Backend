import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Repository } from "typeorm";
import { PostRequestDTO } from "./dto/post.request.dto";
import { PostResponseDTO } from "./dto/post.response.dto";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<PostResponseDTO>,
  ) {}

  async createPost(postRequestDto: PostRequestDTO): Promise<PostResponseDTO> {
    const post: Post = new Post();

    if(!postRequestDto.user) throw new HttpException('User is not provide', HttpStatus.BAD_REQUEST)

    post.user = postRequestDto.user
    post.title = postRequestDto.title
    post.content = postRequestDto.content
    post.createdAt = new Date();

    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<PostResponseDTO[]> {
    return this.postRepository.find({ relations: ['user']});
  }
  
  async getAllUserPosts(id: string): Promise<PostResponseDTO[]> {
    return this.postRepository.find({ where: { user: { id: id }}, relations: ['user']})
  }

  async getPostById(id: string): Promise<PostResponseDTO> {
    return this.postRepository.findOne({ where: { id }, relations: ['user']});
  }

  async removePostById(id: string): Promise<{ affected?: number }> {
    return this.postRepository.delete({ id });
  }
}
