import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Post } from '../posts/posts.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @Exclude({ toPlainOnly: true })
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
