import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  createReply(@Body() createReplyDto: CreateReplyDto, @Request() req) {
    const { userId } = req.user;
    const { commentId, text } = createReplyDto;
    return this.replyService.createReply(userId, commentId, text);
  }
  @Post()
  create(@Body() createReplyDto: CreateReplyDto) {
    return this.replyService.create(createReplyDto);
  }

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(+id, updateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyService.remove(+id);
  }
}
