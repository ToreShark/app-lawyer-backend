import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Subcategory } from '../entities/subcategory.entity';

const subcategoriesData = [
  {
    categoryName: 'Уголовное дело',
    slug: 'ugolovnoe-delo',
    subcategories: [
      {
        name: 'Убийство',
        slug: 'ubiystvo',
        description: 'Описание убийства',
        image:
          'https://plus.unsplash.com/premium_photo-1661714112996-c782972c03e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        content:
          'Краткое описание состава убийства и особенности расследования таких дел',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ],
      },
      {
        name: 'Убийство по неосторожности',
        slug: 'ubiystvo-po-neostorozhnosti',
        description: 'Описание убийства по неосторожности',
        image:
          'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        content: 'Краткое описание состава убийства по неосторожности',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Гражданское дело',
    slug: 'grazhdanskoe-delo',
    subcategories: [
      {
        name: 'Заявление о разводе',
        slug: 'zayavlenie-o-razvode',
        description: 'Видеоурок и образец заявления о разводе',
        image:
          'https://images.unsplash.com/photo-1516822003754-cca485356ecb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        content:
          'Краткое описание заявления о разводе и рассмотрение таких дел судами',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ],
      },
      {
        name: 'Иск о взыскании алиментов',
        slug: 'isk-o-vzyiskanii-alimentov',
        description: 'Видеоурок и образец иска о взыскании алиментов',
        image:
          'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        content: 'Краткое описание иска о взыскании алиментов',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
          {
            url: 'https://youtu.be/1VxXyBo62yM',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ], 
      },
      {
        name: 'Иск о взыскании алиментов в твердой денежной сумме',
        slug: 'isk-o-vzyiskanii-v-tverdoy-deneyshnoy-summe',
        description:
          'Видеоурок и образец иска о взыскании в твердой денежной сумме',
        image:
          'https://plus.unsplash.com/premium_photo-1664355810344-6f8131758d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80',
        content: 'Краткое описание иска о взыскании в твердой денежной сумме',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ],
      }, // добавлять в админке весь контент
    ],
  },
  {
    categoryName: 'Административное дело',
    slug: 'administrativnoe-delo',
    subcategories: [
      {
        name: 'ДТП',
        slug: 'dtp',
        description: 'Описание ДТП',
        image:
          'https://images.unsplash.com/photo-1573068111653-f18bef611c8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
        content: 'Краткое описание состава ДТП и особенности расследования',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ],
      },
      {
        name: 'Лишение водительских прав',
        slug: 'lishenie-voditelskih-prav',
        description: 'Описание лишения водительских прав',
        image:
          'https://images.unsplash.com/photo-1636012474705-b91610743811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        content: 'Краткое описание состава лишения водительских прав',
        videos: [
          {
            url: 'https://youtu.be/AmUenqhE1mw',
            description: `<div class="App" style="text-align: center;">
              <h1>Заявление</h1>
              <p>от [name]</p>
              <p>для [nameFor]</p>
              <p>
                <a
                  href="https://github.com/remarkablemark/html-react-parser"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub repository
                </a>
              </p>
              <hr class="remove">
            </div>`,
          },
        ],
      },
    ],
  },
];

@Injectable()
export class SubcategorySeeder {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  @Command({
    command: 'create:subcategories',
    describe: 'Create subcategories',
  })
  async createSubcategories() {
    const categoryRepository = this.entityManager.getRepository(Category);
    const subcategoryRepository = this.entityManager.getRepository(Subcategory);

    for (const { categoryName, subcategories } of subcategoriesData) {
      const category = await categoryRepository.findOne({
        where: { name: categoryName },
      });

      if (!category) {
        console.error(`Category "${categoryName}" not found.`);
        continue;
      }

      for (const subcategoryData of subcategories) {
        const existingSubcategory = await subcategoryRepository.findOne({
          where: { name: subcategoryData.name, category: { id: category.id } },
        });

        if (!existingSubcategory) {
          const newSubcategory = subcategoryRepository.create({
            ...subcategoryData,
            category: category,
            videos: subcategoryData.videos.map((video) => ({
              url: video.url,
              description: video.description,
            })),
          });
          await subcategoryRepository.save(newSubcategory);
        }
      }
    }
  }
}
