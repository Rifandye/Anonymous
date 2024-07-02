import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comments.entitry';
import { User } from '../auth/user.entity';
import { Post } from '../posts/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async commentPost(
    id: string,
    user: User,
    createCommentDto: CreateCommentDto,
  ) {
    const { content } = createCommentDto;

    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const commentedPost = this.commentsRepository.create({
      content,
      user,
      post,
    });

    const savedComment = this.commentsRepository.save(commentedPost);

    return savedComment;
  }
}
