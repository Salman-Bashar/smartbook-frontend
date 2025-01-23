import { sanityFetch } from '@/backend/sanity/fetch';
import { SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/seo';
import { ISanityLimitedSeoData } from '@/backend/sanity/fragments/root/seo/interface';
import { getRelativeURL } from '@/lib/routes';
import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const baseUrl: string =
    (SITE_URL && `https://${SITE_URL}`) || 'http://localhost:3000';

  const sitemaps: MetadataRoute.Sitemap = [];

  // Home Page
  const SANITY_HOME_PAGE_QUERY = groq`
    *[_type == "homePage"][0]{
      ${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
    }
  `;

  const homePageData = await sanityFetch<ISanityLimitedSeoData>({
    query: SANITY_HOME_PAGE_QUERY,
  });

  if (homePageData && homePageData._updatedAt) {
    sitemaps.push({
      url: baseUrl,
      lastModified: homePageData._updatedAt,
    });
  }

  // General Page
  const SANITY_GENERAL_PAGES_QUERY = groq`
    *[_type == "generalPage"]{
        ${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
    }
  `;
  const generalPagesData = await sanityFetch<ISanityLimitedSeoData[]>({
    query: SANITY_GENERAL_PAGES_QUERY,
  });

  if (generalPagesData && generalPagesData.length > 0) {
    generalPagesData.forEach((page) => {
      sitemaps.push({
        url: baseUrl + getRelativeURL('generalPage', page.slug),
        lastModified: page._updatedAt,
      });
    });
  }

  // Book Page
  const SANITY_BOOK_PAGES_QUERY = groq`
    *[_type == "book"]{
        ${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
    }
  `;
  const bookPagesData = await sanityFetch<ISanityLimitedSeoData[]>({
    query: SANITY_BOOK_PAGES_QUERY,
  });

  if (bookPagesData && bookPagesData.length > 0) {
    bookPagesData.forEach((page) => {
      sitemaps.push({
        url: baseUrl + getRelativeURL('book', page.slug),
        lastModified: page._updatedAt,
      });
    });
  }

  return sitemaps;
}
