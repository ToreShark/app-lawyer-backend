import { Reply } from '../../reply/entities/reply.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { User } from '../../users/entities/user.entity';
import { Vote } from '../../votes/entities/vote.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.comments)
  subcategory: Subcategory;

  @OneToMany(() => Vote, (vote) => vote)
  votes: Vote[];

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];
}
