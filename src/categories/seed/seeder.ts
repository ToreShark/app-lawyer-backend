import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

const categorySeeds = [
  {
    name: 'Уголовное дело',
    slug: 'ugolovnoe-delo',
    description: `Категория "Уголовное дело" на нашем юридическом сайте предназначена для тех, кто ищет надежную 
    поддержку в разбирательствах с законом.`,
  },
  {
    name: 'Гражданское дело',
    slug: 'grazhdanskoe-delo',
    description: `Категория "Гражданское дело" на нашем юридическом сайте предоставляет все необходимые инструменты 
    для успешного решения ваших гражданских проблем.`,
  },
  {
    name: 'Административное дело',
    slug: 'administrativnoe-delo',
    description: `Категория "Административное дело" на нашем юридическом сайте предоставляет важную информацию для тех, кто 
    столкнулся с административными проблемами.`,
  },
];

@Injectable()
export class CategorySeeder {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Command({
    command: 'create:categories',
    describe: 'Create categories',
  })
  async createCategories() {
    for (const seed of categorySeeds) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { slug: seed.slug },
      });

      if (!existingCategory) {
        const category = this.categoryRepository.create(seed);
        await this.categoryRepository.save(category);
      }
    }
  }
}
