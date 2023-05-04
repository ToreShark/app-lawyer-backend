import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/create.documents.dto';
import { UpdateDocumentDto } from './dtos/update.documents.dto';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  findAll() {
    return this.documentRepository.find();
  }

  async findOne(id: string) {
    const documents = this.documentRepository.find({
      where: { id },
    });
    if (!documents) {
      throw new Error(`Document #${id} not found`);
    }
    return documents;
  }

  create(createDocumentDto: CreateDocumentDto) {
    const newDocument = this.documentRepository.create(createDocumentDto);
    return this.documentRepository.save(newDocument);
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const existingDocument = await this.documentRepository.preload({
      id: id,
      ...updateDocumentDto,
    });
    if (!existingDocument) {
      throw new Error(`Document #${id} not found`);
    }

    return this.documentRepository.save(existingDocument);
  }

  async remove(id: string) {
    const document = await this.documentRepository.findOne({
      where: { id },
    });
    return this.documentRepository.remove(document);
  }
}
