import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { CommentsService } from '../comments/comments.service';
import { Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    private authService: AuthService,
    private commentsService: CommentsService,
  ) {}

  async createReply(userId: string, commentId: string, text: string) {
    const user = await this.authService.findOne(userId);
    const comment = await this.commentsService.findOne(commentId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const reply = this.replyRepository.create({ user, comment, text });

    await this.replyRepository.save(reply);

    return reply;
  }
  create(createReplyDto: CreateReplyDto) {
    return 'This action adds a new reply';
  }

  findAll() {
    return `This action returns all reply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
