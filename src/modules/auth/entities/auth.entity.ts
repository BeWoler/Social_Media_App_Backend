import { UserResponseDTO } from 'src/modules/user/dto/user.response.dto';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  accessToken: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: UserResponseDTO;
}
