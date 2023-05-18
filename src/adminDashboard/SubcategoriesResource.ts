import { Subcategory } from '../subcategories/entities/subcategory.entity';

export const SubcategoryResource = {
  resource: Subcategory,
  options: {
    properties: {
      description: {
        type: 'textarea',
        props: {
          rows: 20,
        },
      },
      videos: {
        type: 'mixed',
        isArray: true,
      },
      'videos.url': {
        type: 'string',
        isTitle: true,
      },
      'videos.description': {
        type: 'textarea',
        props: {
          rows: 20,
        },
      },
    },
  },
};
