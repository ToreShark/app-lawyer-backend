import { AboutUs } from 'src/aboutus/entities/aboutus.entity';

export const AboutUsResource = {
  resource: AboutUs,
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
