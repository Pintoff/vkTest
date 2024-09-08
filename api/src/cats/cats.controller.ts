import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../entities/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post('like/:uid')
  async addLike(
    @Param('uid') uid: string,
    @Body('url') url: string,
  ): Promise<Cat> {
    return this.catsService.addLike(uid, url);
  }
  @Delete('like/:uid')
  async removeLike(@Param('uid') uid: string): Promise<void> {
    return this.catsService.removeLike(uid);
  }
  @Get('likes')
  async getAllLikes(): Promise<Cat[]> {
    return this.catsService.getAllLikes();
  }
}