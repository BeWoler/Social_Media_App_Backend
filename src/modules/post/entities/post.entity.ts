import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: 'text'})
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 0 })
  likesCount: number;

  @Column({ type: "date" })
  createdAt: Date;
}
