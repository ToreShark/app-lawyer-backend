import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUs } from './entities/aboutus.entity';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(AboutUs)
    private aboutUsRepository: Repository<AboutUs>,
  ) {}

  async create(aboutUsData: Partial<AboutUs>): Promise<AboutUs> {
    const aboutUsEntry = this.aboutUsRepository.create(aboutUsData);
    return this.aboutUsRepository.save(aboutUsEntry);
  }
}
