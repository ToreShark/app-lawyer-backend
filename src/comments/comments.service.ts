import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { SubcategoriesService } from '../subcategories/subcategories.service';
import { Vote } from '../votes/entities/vote.entity';
import { VotesService } from '../votes/votes.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private authService: AuthService,
    private subcategoriesService: SubcategoriesService,
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
  ) {}

  // create(createCommentDto: CreateCommentDto) {
  //   return 'This action adds a new comment';
  // }

  findAll() {
    return `This action returns all comments`;
  }

  async findAllBySubcategory(id: string) {
    try {
      return await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .where('comment.subcategory = :id', { id })
        .getMany();
    } catch (error) {
      console.error(error);
    }
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: string,
    subcategoryId: string,
  ) {
    const user = await this.authService.findOne(userId);
    const subcategory = await this.subcategoriesService.findById(subcategoryId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      user,
      subcategory,
    });

    return await this.commentRepository.save(comment);
  }

  findOne(id: string) {
    try {
      return this.commentRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error finding comment');
    }
  }

  async getCommentVotes(
    commentId: string,
  ): Promise<{ upvotes: number; downvotes: number }> {
    const votes = await this.votesRepository
      .createQueryBuilder('vote')
      .select('vote.value, COUNT(vote.id) as count')
      .where('vote.commentId = :commentId', { commentId })
      .groupBy('vote.value')
      .getRawMany();

    let upvotes = 0;
    let downvotes = 0;

    for (const vote of votes) {
      if (vote.value) {
        upvotes = Number(vote.count);
      } else {
        downvotes = Number(vote.count);
      }
    }

    return { upvotes, downvotes };
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id },
      });

      if (!comment) {
        throw new NotFoundException(`Comment #${id} not found`);
      }

      await this.commentRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error removing comment');
    }
  }
}
