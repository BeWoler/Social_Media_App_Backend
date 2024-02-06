import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserResponseDTO } from "./dto/user.response.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async getUserById(userId: string): Promise<UserResponseDTO> {
    const user = this.userRepository.findOneBy({ id: userId })
    return { ...user, password: null }
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    return (await this.userRepository.find()).map((user) => ({
      ...user,
      password: null
    }));
  }
}
