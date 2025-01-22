import { ISanityImage } from '@/backend/sanity/fragments/root/media/image/interface';

export interface ISanityPrimaryHero {
  _type: 'primaryHeroSection';
  title: string;
  description: string;
  image?: ISanityImage;
}
