import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30})
  author: string;

  @Column({ type: 'text'})
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: "date" })
  createdAt: Date;
}
