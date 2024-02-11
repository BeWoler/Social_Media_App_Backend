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
    const user = await this.userRepository.findOneBy({ id: userId })
    const userDTO = new UserResponseDTO(user);

    return userDTO;
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.find();
    const usersDTO = users.map((user: User) => {
      const userDTO = new UserResponseDTO(user)
      return userDTO;
    })

    return usersDTO;
  }
}
