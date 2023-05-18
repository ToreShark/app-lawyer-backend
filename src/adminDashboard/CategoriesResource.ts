import { Category } from '../categories/entities/category.entity';

export const CategoriesResource = {
  resource: Category,
  options: {
    properties: {
      description: {
        type: 'textarea',
        props: {
          rows: 20,
        },
      },
    },
  },
};
