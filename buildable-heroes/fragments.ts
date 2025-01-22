import { groq } from 'next-sanity';
import { SANITY_NORMAL_HERO_FRAGMENT } from './primary/builder/fragment';

export const SANITY_HERO_QUERY_FRAGMENT = groq`
	${SANITY_NORMAL_HERO_FRAGMENT},
`;
