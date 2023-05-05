import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoryRepository.find();
  }

  async findByCategoryId(categoryId: string): Promise<Subcategory[]> {
    const options: FindManyOptions = {
      where: { category: { id: categoryId } },
    };
    return await this.subcategoryRepository.find(options);
  }

  async findIdByName(name: string): Promise<string> {
    const category = await this.subcategoryRepository.findOne({
      where: { name: name },
    });
    if (!category) {
      throw new NotFoundException(`Category with name "${name}" not found.`);
    }
    return category.id;
  }

  async getSubcategoryById(subcategoryId: string): Promise<Subcategory> {
    return await this.subcategoryRepository.findOne({
      where: { id: subcategoryId },
    });
  }

  async findById(id: string): Promise<Subcategory> {
    const options = {
      where: { id },
    };
    return await this.subcategoryRepository.findOne(options);
  }
  async findBySlug(slug: string): Promise<Subcategory> {
    const options = {
      where: { slug },
    };
    return await this.subcategoryRepository.findOne(options);
  }
}
