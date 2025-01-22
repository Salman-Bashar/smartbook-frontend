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

  // Blog Page
  const SANITY_BLOG_PAGES_QUERY = groq`
    *[_type == "blog"]{
        ${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
    }
  `;
  const blogPagesData = await sanityFetch<ISanityLimitedSeoData[]>({
    query: SANITY_BLOG_PAGES_QUERY,
  });

  if (blogPagesData && blogPagesData.length > 0) {
    blogPagesData.forEach((page) => {
      sitemaps.push({
        url: baseUrl + getRelativeURL('blog', page.slug),
        lastModified: page._updatedAt,
      });
    });
  }

  return sitemaps;
}
