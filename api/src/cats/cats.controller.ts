import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../entities/cat.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('likes/:uid')
  @UseGuards(AuthGuard('jwt'))
  async addLike(
    @Param('uid') uid: string,
    @Body('url') url: string,
    @Request() req: any,
  ): Promise<Cat> {
    const userId = req.user.id;
    return this.catsService.addLike(userId, uid, url);
  }

  @Delete('likes/:uid')
  @UseGuards(AuthGuard('jwt'))
  async removeLike(
    @Param('uid') uid: string,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user.id; 
    return this.catsService.removeLike(userId, uid);
  }

  @Get('likes')
  @UseGuards(AuthGuard('jwt'))
  async getAllLikes(@Request() req: any): Promise<Cat[]> {
    const userId = req.user.id; 
    return this.catsService.getAllLikes(userId);
  }
}