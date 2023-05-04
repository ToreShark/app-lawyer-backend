import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUs } from '../entities/aboutus.entity';

const aboutUsSeeds = [
  {
    description: 'Description 1',
    image: 'image1.jpg',
    slug: 'slug-1',
  },
];

@Injectable()
export class AboutUsSeeder {
  constructor(
    @InjectRepository(AboutUs)
    private aboutUsRepository: Repository<AboutUs>,
  ) {}

  @Command({
    command: 'create:aboutus',
    describe: 'Create About Us data',
  })
  async createAboutUs() {
    for (const seed of aboutUsSeeds) {
      const existingAboutUs = await this.aboutUsRepository.findOne({
        where: { slug: seed.slug },
      });

      if (!existingAboutUs) {
        const aboutUs = this.aboutUsRepository.create(seed);
        await this.aboutUsRepository.save(aboutUs);
      }
    }
  }
}
