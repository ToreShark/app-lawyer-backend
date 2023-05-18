import { CommentEntity } from '../../comments/entities/comment.entity';
import { DocumentEntity } from '../../documents/entities/document.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Vote } from '../../votes/entities/vote.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enum/role.enum';
import { Otp } from './otp.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany((type) => Otp, (otp) => otp.user)
  otpCodes: Otp[];

  @OneToMany((_type) => DocumentEntity, (doc) => doc.user, { eager: true })
  docs: DocumentEntity[];

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => Vote, (vote) => vote)
  votes: Vote[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];
}
