import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AboutUsService } from './aboutus.service';

@Injectable()
export class CreateAboutUsCommand {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Command({
    command: 'create:aboutus <description> <image> <slug>',
    describe: 'create an about us entry',
  })
  async create(
    @Positional({
      name: 'description',
      describe: 'the description of the about us entry',
      type: 'string',
    })
    description: string,
    @Positional({
      name: 'image',
      describe: 'the image URL of the about us entry',
      type: 'string',
    })
    image: string,
    @Positional({
      name: 'slug',
      describe: 'the slug of the about us entry',
      type: 'string',
    })
    slug: string,
  ) {
    console.log('Creating about us entry:', {
      description,
      image,
      slug,
    });
    await this.aboutUsService.create({
      description,
      image,
      slug,
    });
  }
}
