import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AboutUs extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  slug: string;
}
