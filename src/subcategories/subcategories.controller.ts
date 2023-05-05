import { Controller, Get, Param } from '@nestjs/common';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  async findAll(): Promise<Subcategory[]> {
    return await this.subcategoriesService.findAll();
  }

  @Get('byCategory/:categoryId')
  async findByCategoryId(
    @Param('categoryId') category_id: string,
  ): Promise<Subcategory[]> {
    return await this.subcategoriesService.findByCategoryId(category_id);
  }

  @Get('idByName/:categoryName')
  async findIdByName(@Param('categoryName') name: string): Promise<string> {
    console.log('name', name);
    return await this.subcategoriesService.findIdByName(name);
  }

  @Get('bySlug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<Subcategory> {
    return await this.subcategoriesService.findBySlug(slug);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Subcategory> {
    return await this.subcategoriesService.findById(id);
  }
}
