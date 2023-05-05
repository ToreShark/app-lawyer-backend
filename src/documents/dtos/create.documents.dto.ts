import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateDocumentDto {
  @ApiProperty({ description: 'Document name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Document description' })
  @IsString()
  description: string;
}
