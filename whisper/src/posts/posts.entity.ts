import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  user: User;
}
