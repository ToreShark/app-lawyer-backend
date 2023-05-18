import { Category } from '../../categories/entities/category.entity';
import { CommentEntity } from '../../comments/entities/comment.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Entity,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

export type VideoType = {
  url: string;
  description: string;
};

@Entity({ name: 'subcategory' })
export class Subcategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column('jsonb', { nullable: true })
  videos: VideoType[];

  @Column({ nullable: true })
  content: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;

  @Column()
  slug: string;

  @OneToMany(() => CommentEntity, (comment) => comment.subcategory)
  comments: CommentEntity[];
}
