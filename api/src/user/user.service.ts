import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

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
  
  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { login, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    const token = jwt.sign({ userId: user.id }, 'secret_salt', { expiresIn: '1h' });
    return { token };
  }

}
