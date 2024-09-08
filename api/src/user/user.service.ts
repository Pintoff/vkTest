import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: { login },
    });
    if (existingUser) {
        throw new ConflictException('Пользователь с таким логином уже существует');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      login,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
