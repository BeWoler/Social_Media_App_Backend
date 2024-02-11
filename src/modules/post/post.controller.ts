import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostRequestDTO } from "./dto/post.request.dto";
import { PostResponseDTO } from "./dto/post.response.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { postSwagger } from "./post.swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation(postSwagger.CREATE_POST.descr)
  @ApiResponse(postSwagger.CREATE_POST.res)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() postRequestDto: PostRequestDTO): Promise<string> {
    return this.postService.createPost(postRequestDto)
  }

  @Get()
  @ApiOperation(postSwagger.GET_ALL_POSTS.descr)
  @ApiResponse(postSwagger.GET_ALL_POSTS.res)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<PostResponseDTO[]> {
    return this.postService.getAllPosts();
  }

  @Get('/user/:id')
  @ApiOperation(postSwagger.GET_ALL_USER_POSTS.descr)
  @ApiResponse(postSwagger.GET_ALL_USER_POSTS.res)
  @HttpCode(HttpStatus.OK)
  async findAllByUserId(@Param('id') id: string): Promise<PostResponseDTO[]> {
    return this.postService.getAllUserPosts(id);
  }

  @Get(':id')
  @ApiOperation(postSwagger.GET_POST_BY_ID.descr)
  @ApiResponse(postSwagger.GET_POST_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<PostResponseDTO> {
    return this.postService.getPostById(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(postSwagger.DELETE_POST_BY_ID.descr)
  @ApiResponse(postSwagger.DELETE_POST_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async deleteById(@Param('id') id: string): Promise<{ affected?: number}> {
    return this.postService.removePostById(id)
  }
}
