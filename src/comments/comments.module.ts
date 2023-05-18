import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { SubcategoriesModule } from '../subcategories/subcategories.module';
import { AuthModule } from '../auth/auth.module';
import { Vote } from '../votes/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, Vote]),
    SubcategoriesModule,
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
