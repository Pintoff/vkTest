import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async addLike(userId: number, uid: string, url: string): Promise<Cat> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
    const existingCat = await this.catsRepository.findOne({
      where: { uid, user: { id: userId } },
    });
    if (existingCat) {
      return existingCat;
    }
    const cat = new Cat();
    cat.uid = uid;
    cat.url = url;
    cat.user = user;
    return this.catsRepository.save(cat);
  }
  async removeLike(userId: number, uid: string): Promise<void> {
    const cat = await this.catsRepository.findOne({
      where: { uid, user: { id: userId } },
    });
    if (cat) {
      await this.catsRepository.remove(cat);
    }
  }
  async getAllLikes(userId: number): Promise<Cat[]> {
    return this.catsRepository.find({ where: { user: { id: userId } } });
  }
}
