import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostRequestDTO } from './dto/post.request.dto';
import { PostResponseDTO } from './dto/post.response.dto';
import { UserResponseDTO } from '../user/dto/user.response.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<PostResponseDTO>,
  ) {}

  async createPost(postRequestDto: PostRequestDTO): Promise<string> {
    if (!postRequestDto.title || !postRequestDto.description) {
      throw new HttpException(
        'All fields are required!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!postRequestDto.user)
      throw new HttpException('User is not provide', HttpStatus.BAD_REQUEST);

    const post: PostRequestDTO = new PostRequestDTO(postRequestDto);

    await this.postRepository.save(post);

    return 'Created';
  }

  async getAllPosts(): Promise<PostResponseDTO[]> {
    const posts = await this.postRepository.find({ relations: ['user'] });
    const postsDTO = posts.map((post: PostResponseDTO) => {
      const postDTO = new PostResponseDTO(post);
      postDTO.user = new UserResponseDTO(post.user);

      return postDTO;
    });
    return postsDTO;
  }

  async getAllUserPosts(id: string): Promise<PostResponseDTO[]> {
    const posts = await this.postRepository.find({
      where: { user: { id: id } },
      relations: ['user'],
    });

    const postsDTO = posts.map((post: PostResponseDTO) => {
      const postDTO = new PostResponseDTO(post);
      postDTO.user = new UserResponseDTO(post.user);

      return postDTO;
    });
    return postsDTO;
  }

  async getPostById(id: string): Promise<PostResponseDTO> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    const postDTO = new PostResponseDTO(post);
    postDTO.user = new UserResponseDTO(post.user);

    return postDTO;
  }

  async removePostById(id: string): Promise<{ affected?: number }> {
    return this.postRepository.delete({ id });
  }
}
