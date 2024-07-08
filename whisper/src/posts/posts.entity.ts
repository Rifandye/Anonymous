import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Comment } from '../comments/comments.entity';
import { Like } from '../likes/likes.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post, { eager: true })
  likes: Like;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
