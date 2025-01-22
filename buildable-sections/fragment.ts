import { groq } from 'next-sanity';
import { SANITY_RICH_TEXT_SECTION_FRAGMENT } from './rich-text/builder/fragment';

export const SANITY_PAGE_SECTIONS_QUERY_FRAGMENT = groq`
	${SANITY_RICH_TEXT_SECTION_FRAGMENT},
`;
