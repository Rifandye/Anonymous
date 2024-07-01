import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { image, description } = createPostDto;

    const post = this.postRepository.create({
      image,
      description,
      user,
    });

    await this.postRepository.save(post);

    return post;
  }

  async getPosts(user: User): Promise<Post[]> {
    const posts = await this.postRepository.find({ where: { user } });

    return posts;
  }
}
