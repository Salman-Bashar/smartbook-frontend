import { PortableTextBlock } from '@portabletext/types';
import { ISanityImage } from '../media/image/interface';
import { ISanityVideo } from '../media/video/interface';
import { ISanityCode } from '../common';

export type ISanityPortableText = (
  | PortableTextBlock
  | ISanityPortableTextImage
  | ISanityPortableTextVideo
  | ISanityCode
)[];

export interface ISanityPortableTextImage extends ISanityImage {
  _type: string;
  markDefs?: undefined | [] | null;
}

export interface ISanityPortableTextVideo extends ISanityVideo {
  _type: string;
  markDefs?: undefined | [] | null;
}
