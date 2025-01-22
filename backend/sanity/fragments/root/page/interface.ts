import { ISanityHero } from '@/buildable-heroes/interface';
import { ISanitySections } from '@/buildable-sections/interface';
import { ISanitySchemaMarkup } from '../schema-markup/interface';

export interface ISanityCommonPageProps {
  schemaMarkupDefinitions?: ISanitySchemaMarkup;
  hero: ISanityHero;
  sections?: ISanitySections;
}
