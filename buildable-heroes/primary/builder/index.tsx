import { IImage } from '@/lib/types';
import { PrimaryHero } from '../index';
import { ISanityPrimaryHero } from './interface';
import { generateImageUrl } from '@/backend/sanity/image-builder';
import { PRIMARY_HERO_IMAGE_DIMENSIONS } from '../interface';

export function PrimaryHeroBuilder({
  description,
  image,
  title,
}: ISanityPrimaryHero) {
  let generatedImage: IImage | undefined = undefined;

  if (image) {
    generatedImage = generateImageUrl({
      source: image,
      useCdn: false,
      height: PRIMARY_HERO_IMAGE_DIMENSIONS.height,
      width: PRIMARY_HERO_IMAGE_DIMENSIONS.width,
    });
  }

  return (
    <PrimaryHero
      description={description}
      title={title}
      image={generatedImage}
    />
  );
}
