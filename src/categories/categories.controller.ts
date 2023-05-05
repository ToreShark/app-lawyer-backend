import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { AuthType } from 'src/auth/authentication/enum/auth-type.enum';
import { ApiKeyGuard } from 'src/common/guards/api-key/api-key.guard';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Auth(AuthType.None)
// @UseGuards(ApiKeyGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Get('idByName/:categoryName')
  async findIdByName(
    @Param('categoryName') name: string,
  ): Promise<Subcategory[]> {
    return this.categoriesService.findIdByName(name);
  }

  @Get('byCategorySlug/:slug')
  async findBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoriesService.findBySlug(slug);
  }
}
