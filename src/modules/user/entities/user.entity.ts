import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30})
  email: string;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'text'})
  image: string;

  @Column({ type: 'text' })
  provider: string;
}
