import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['subcategories'] });
  }

  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async findIdByName(name: string): Promise<Subcategory[]> {
    const category = await this.categoriesRepository.findOne({
      where: { name },
      relations: ['subcategories'],
    });
    if (!category) {
      throw new NotFoundException(`Category with name "${name}" not found.`);
    }
    return category.subcategories;
  }

  async findSubcategories(id: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { slug } });
  }
}
