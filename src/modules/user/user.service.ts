import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserRequestDTO } from "./dto/user.request.dto";
import { UserResponseDTO } from "./dto/user.response.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(userRequestDto: UserRequestDTO): Promise<UserResponseDTO> {
    const existingEmail = await this.userRepository.findOneBy({ email: userRequestDto.email })
    const existingProvider = await this.userRepository.findOneBy({ provider: userRequestDto.provider })

    if(existingEmail && existingProvider) {
      throw new HttpException('Email already exist!', HttpStatus.BAD_REQUEST)
    }

    const user: User = new User()

    user.email = userRequestDto.email;
    user.name = userRequestDto.name || '';
    user.image = userRequestDto.image || '';
    user.provider = userRequestDto.provider;

    return this.userRepository.save(user);
  }

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ id: userId })
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    return this.userRepository.find();
  }
}
