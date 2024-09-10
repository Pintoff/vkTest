import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  login: string;
  @Column()
  password: string;
  @OneToMany(() => Cat, (cat) => cat.user)
  cats: Cat[];
}
