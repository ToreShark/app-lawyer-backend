import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { DocumentsModule } from './documents/documents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DataSource } from 'typeorm';
import { AboutusModule } from './aboutus/aboutus.module';
import { CommandModule } from 'nestjs-command';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';
import { AboutUsResource } from './adminDashboard/AboutUsResource';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesResource } from './adminDashboard/CategoriesResource';
import { SubcategoriesController } from './subcategories/subcategories.controller';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { componentLoader } from './adminDashboard/component';
import { SubcategoryResource } from './adminDashboard/SubcategoriesResource';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Otp } from './users/entities/otp.entity';
import { UsersService } from './users/users.service';

AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});
@Module({
  imports: [
    ConfigModule.forRoot({}),
    AdminModule.createAdminAsync({
      useFactory: () => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [AboutUsResource, CategoriesResource, SubcategoryResource],
          componentLoader,
        },
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    DocumentsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    AboutusModule,
    CommandModule,
    CategoriesModule,
    SubcategoriesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    CoffeesController,
    SubcategoriesController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}
