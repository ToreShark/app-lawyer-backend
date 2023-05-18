import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { CommentsService } from '../comments/comments.service';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    private authService: AuthService,
    private commentsService: CommentsService,
  ) {}

  async vote(userId: string, commentId: string, value: boolean) {
    const user = await this.authService.findOne(userId);
    const comment = await this.commentsService.findOne(commentId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    let vote = await this.votesRepository.findOne({
      where: {
        user: { id: user.id },
        comment: { id: comment.id },
        value: value,
      },
    });

    if (!vote) {
      vote = this.votesRepository.create({ user, comment, value });
      await this.votesRepository.save(vote);
    }

    return vote;
  }

  create(createVoteDto: CreateVoteDto) {
    return 'This action adds a new vote';
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
