import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/:id')
  createComment(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.commentPost(id, user, createCommentDto);
  }
}
