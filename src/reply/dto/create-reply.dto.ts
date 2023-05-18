import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyDto {
  @ApiProperty({ example: 'commentId' })
  @IsNotEmpty()
  @IsString()
  commentId: string;

  @ApiProperty({ example: 'text' })
  @IsNotEmpty()
  @IsString()
  text: string;
}
