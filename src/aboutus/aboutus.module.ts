import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateAboutUsCommand } from './aboutus.command';
import { AboutusController } from './aboutus.controller';
import { AboutUsService } from './aboutus.service';
import { AboutUs } from './entities/aboutus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUs])],
  providers: [AboutUsService, CreateAboutUsCommand],
  controllers: [AboutusController],
})
export class AboutusModule {}
