import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // @Post()
  // create(@Body() createCommentDto: CreateCommentDto) {
  //   return this.commentsService.create(createCommentDto);
  // }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('subcategory/:id')
  async findAllBySubcategory(@Param('id') id: string) {
    return await this.commentsService.findAllBySubcategory(id);
  }

  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Body('userId') userId: string,
    @Body('subcategoryId') subcategoryId: string,
  ) {
    return await this.commentsService.createComment(
      createCommentDto,
      userId,
      subcategoryId,
    );
  }

  @Get(':commentId/votes')
  async getVotes(@Param('commentId') commentId: string) {
    return await this.commentsService.getCommentVotes(commentId);
  }

  @Get('subcategory/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete('subcategory/:id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
