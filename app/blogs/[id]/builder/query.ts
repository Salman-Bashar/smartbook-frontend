import { SANITY_COMMON_PAGE_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/page';
import { SANITY_PORTABLE_TEXT_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/portable-text';
import {
  SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT,
  SANITY_SEO_DATA_QUERY_FRAGMENT,
} from '@/backend/sanity/fragments/root/seo';
import groq from 'groq';

export const SANITY_BLOG_PAGE_QUERY = groq`
	*[_type == "blog" && seo.slug.current == $slug][0]{
		${SANITY_COMMON_PAGE_QUERY_FRAGMENT},
		blogContent[]{
			${SANITY_PORTABLE_TEXT_QUERY_FRAGMENT}
		},
		isFeaturedBlog
	}
`;

export const SANITY_BLOG_PAGE_SEO_QUERY = groq`
	*[_type == "blog" && seo.slug.current == $slug][0]{
		${SANITY_SEO_DATA_QUERY_FRAGMENT}
	}
`;

export const SANITY_ALL_BLOG_PAGES_QUERY = groq`
	*[_type == "blog"]{
		${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
	}
`;
