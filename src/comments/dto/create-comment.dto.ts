import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'c0d1e6c0-0b1e-4b1a-9f1a-2b9d7d0e1f1e' })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'c0d1e6c0-0b1e-4b1a-9f1a-2b9d7d0e1f1e' })
  @IsNotEmpty()
  @IsUUID()
  subcategoryId: string;
}
