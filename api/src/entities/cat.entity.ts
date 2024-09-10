import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;  
  @Column()
  uid: string;
  @Column()
  url: string;
  @ManyToOne(() => User, (user) => user.cats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
