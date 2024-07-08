import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { Comment } from '../comments/comments.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
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
    const posts = await this.postRepository.find({
      where: { user: { id: user.id } },
    });

    return posts;
  }

  async getPostById(id: string, user: User): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async updatePostById(
    id: string,
    user: User,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const result = await this.postRepository.update(
      { id, user },
      updatePostDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }

    const updatedPost = await this.postRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    return updatedPost;
  }

  async deletePostById(id: string, user: User): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    console.log(user);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.commentRepository.delete({ post });

    const result = await this.postRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException('Post not found');
    }
  }
}
