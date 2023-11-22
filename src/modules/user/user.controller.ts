import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRequestDTO } from "./dto/user.request.dto";
import { UserResponseDTO } from "./dto/user.response.dto";
import { userSwagger } from "./user.swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation(userSwagger.CREATE_USER.descr)
  @ApiResponse(userSwagger.CREATE_USER.res)
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: UserRequestDTO): Promise<UserResponseDTO> {
    return this.userService.createUser(user)
  }

  @Get(':id')
  @ApiOperation(userSwagger.GET_USER_BY_ID.descr)
  @ApiResponse(userSwagger.GET_USER_BY_ID.res)
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') userId: string): Promise<UserResponseDTO> {
    return this.userService.getUserById(userId)
  }

  @Get()
  @ApiOperation(userSwagger.GET_ALL_USERS.descr)
  @ApiResponse(userSwagger.GET_ALL_USERS.res)
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<UserResponseDTO[]> {
    return this.userService.getAllUsers()
  }
}
