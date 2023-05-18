import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}
  @Post(':commentId/upvote')
  async upvote(
    @Param('userId') userId: string,
    @Param('commentId') commentId: string,
  ) {
    return await this.votesService.vote(userId, commentId, true);
  }

  @Post(':commentId/downvote')
  async downvote(
    @Param('userId') userId: string,
    @Param('commentId') commentId: string,
  ) {
    return await this.votesService.vote(userId, commentId, false);
  }

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get()
  findAll() {
    return this.votesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(+id, updateVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votesService.remove(+id);
  }
}
