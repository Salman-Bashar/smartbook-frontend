import { SANITY_COMMON_PAGE_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/page';
import {
  SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT,
  SANITY_SEO_DATA_QUERY_FRAGMENT,
} from '@/backend/sanity/fragments/root/seo';
import groq from 'groq';

export const SANITY_GENERAL_PAGE_QUERY = groq`
	*[_type == "generalPage" && seo.slug.current == $slug][0]{
		${SANITY_COMMON_PAGE_QUERY_FRAGMENT}
	}
`;

export const SANITY_GENERAL_PAGE_SEO_QUERY = groq`
	*[_type == "generalPage" && seo.slug.current == $slug][0]{
		${SANITY_SEO_DATA_QUERY_FRAGMENT}
	}
`;

export const SANITY_ALL_GENERAL_PAGES_QUERY = groq`
	*[_type == "generalPage"]{
		${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
	}
`;
