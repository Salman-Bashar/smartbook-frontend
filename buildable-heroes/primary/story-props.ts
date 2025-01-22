import { STORYBOOK_IMAGE_BLUR_DATA_URL } from '@/lib/types';
import { IPrimaryHero } from './interface';

export const heroPropsWithImage: IPrimaryHero = {
  title: 'Lemonhive Nextjs starter',
  description: 'We build the best site throughout this whole wide world',
  image: {
    src: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
    alt: 'Anne Sisterone',
    lqip: STORYBOOK_IMAGE_BLUR_DATA_URL,
  },
};

export const heroPropsWithoutImage: IPrimaryHero = {
  title: 'Lemonhive Nextjs starter',
  description: 'We build the best site throughout this whole wide world',
};
