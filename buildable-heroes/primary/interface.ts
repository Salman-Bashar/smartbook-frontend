import { IImage } from '@/lib/types';

/** This interface represents a hero section. */
export interface IPrimaryHero {
  /** The title of the hero section. */
  title: string;
  /** The description or content of the hero section. */
  description: string;
  /** The properties of the desktop image used in the hero section. */
  image?: IImage;
}

export const PRIMARY_HERO_IMAGE_DIMENSIONS = {
  height: 400,
  width: 1440,
};
