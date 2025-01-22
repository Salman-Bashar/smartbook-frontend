import { groq } from 'next-sanity';
import { SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT } from '../schema-markup';
import { SANITY_HERO_QUERY_FRAGMENT } from '@/buildable-heroes/fragments';
import { SANITY_PAGE_SECTIONS_QUERY_FRAGMENT } from '@/buildable-sections/fragment';

export const SANITY_COMMON_PAGE_QUERY_FRAGMENT = groq`
  "schemaMarkupDefinitions": ${SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT},
  hero->{
    ${SANITY_HERO_QUERY_FRAGMENT}
  },
  sections[]{
    ${SANITY_PAGE_SECTIONS_QUERY_FRAGMENT}
  }
`;
