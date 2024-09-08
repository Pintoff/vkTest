import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;  
  @Column()
  uid: string;
  @Column()
  url: string;
}
