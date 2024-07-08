import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './likes.entity';
import { Post } from 'src/posts/posts.entity';
import { PostsModule } from 'src/posts/posts.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post]), PostsModule, AuthModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
