import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30})
  email: string;

  @Column({ type: 'varchar', length: 30})
  username: string;

  @Column({ type: 'varchar' })
  password: string; 

  @Column({ type: 'text', default: ''})
  name: string;

  @Column({ type: 'text', default: ''})
  image: string;
}
