import { ISanityHero } from '@/buildable-heroes/interface';
import { ISanitySections } from '@/buildable-sections/interface';

export interface ISanityCommonPageProps {
  hero: ISanityHero;
  sections?: ISanitySections;
}
