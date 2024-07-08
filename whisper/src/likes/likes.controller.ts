import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LikesService } from './likes.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('likes')
@UseGuards(AuthGuard())
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Post('/:id')
  createLike(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.likeService.likePost(id, user);
  }
}
