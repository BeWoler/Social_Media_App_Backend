import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResponseDTO } from "./dto/user.response.dto";
import { userSwagger } from "./user.swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService, private configService: ConfigService) {}

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
