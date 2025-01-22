import { SANITY_COMMON_PAGE_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/page';
import { SANITY_SEO_DATA_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/seo';
import groq from 'groq';

export const SANITY_HOME_PAGE_QUERY = groq`
	*[_type == "homePage"][0]{
		${SANITY_COMMON_PAGE_QUERY_FRAGMENT}
	}
`;

export const SANITY_HOME_PAGE_SEO_QUERY = groq`
	*[_type == "homePage"][0]{
		${SANITY_SEO_DATA_QUERY_FRAGMENT}
	}
`;
