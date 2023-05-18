import { CommentEntity } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'replies' })
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies)
  comment: CommentEntity;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;
}
