import { number } from '@hapi/joi';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Otp {
  //   @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  //   @ApiProperty({ type: () => User })
  @ManyToOne((type) => User, (user) => user.otpCodes)
  user: User;

  //   @ApiProperty({ type: Number })
  @Column({ name: 'otp', nullable: true })
  code: number;

  //   @ApiProperty({ type: Date })
  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'expirationDate',
  })
  expirationDate: Date;
}
