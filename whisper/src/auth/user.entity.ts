import { Comment } from '../comments/comments.entitry';
import { Post } from '../posts/posts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany((_type) => Post, (post) => post.user, { eager: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
