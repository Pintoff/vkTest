import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../entities/cat.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post('like/:uid')
  @UseGuards(AuthGuard('jwt'))
  async addLike(
    @Param('uid') uid: string,
    @Body('url') url: string,
  ): Promise<Cat> {
    return this.catsService.addLike(uid, url);
  }
  @Delete('like/:uid')
  @UseGuards(AuthGuard('jwt'))
  async removeLike(@Param('uid') uid: string): Promise<void> {
    return this.catsService.removeLike(uid);
  }
  @Get('likes')
  @UseGuards(AuthGuard('jwt'))
  async getAllLikes(): Promise<Cat[]> {
    return this.catsService.getAllLikes();
  }
}