import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../auth/authentication/decorators/auth.decorator';
import { AuthType } from '../auth/authentication/enum/auth-type.enum';
import { Roles } from '../auth/authorization/decorators/roles.decorator';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interface/active-user-data.interface';
import { Role } from '../users/enum/role.enum';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dtos/create.documents.dto';
import { validate as isUUID } from 'uuid';

@Auth(AuthType.None)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get()
  findAll(@ActiveUser() user: ActiveUserData) {
    console.log(user);
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new NotFoundException(`Invalid UUID format: ${id}`);
    }

    const document = this.documentsService.findOne(id);
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    console.log(createDocumentDto instanceof CreateDocumentDto);
    return this.documentsService.create(createDocumentDto);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.documentsService.update(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }
}
function validateUUID(id: string) {
  throw new Error('Function not implemented.');
}
