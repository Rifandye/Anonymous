import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { AuthModule } from '../auth/auth.module';
import { Comment } from '../comments/comments.entitry';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
