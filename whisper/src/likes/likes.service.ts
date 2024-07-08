import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './likes.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from '../posts/posts.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async likePost(id: string, user: User): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingLike = await this.likesRepository.findOne({
      where: { post: { id }, user: { id: user.id } },
    });

    if (existingLike) {
      throw new BadRequestException('You have already liked this post');
    }

    const likedPost = this.likesRepository.create({
      user,
      post,
    });

    await this.likesRepository.save(likedPost);
  }
}
