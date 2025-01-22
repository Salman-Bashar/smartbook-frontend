import { SANITY_LINK_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/link';
import { groq } from 'next-sanity';

export const SANITY_HEADER_QUERY_FRAGMENT = groq`
	menuLinks[]{
		${SANITY_LINK_QUERY_FRAGMENT}
	}
`;
