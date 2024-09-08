import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async addLike(uid: string, url: string): Promise<Cat> {
    const existingCat = await this.catsRepository.findOne({ where: { uid } });
    if (existingCat) {
      return existingCat;
    }
    const cat = new Cat();
    cat.uid = uid;
    cat.url = url;
    return this.catsRepository.save(cat);
  }

  async removeLike(uid: string): Promise<void> {
    await this.catsRepository.delete({ uid });
  }

  async getAllLikes(): Promise<Cat[]> {
    return this.catsRepository.find();
  }
}
