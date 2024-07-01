import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './posts.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  getAllPost(@GetUser() user: User): Promise<PostEntity[]> {
    return this.postService.getPosts(user);
  }
}
