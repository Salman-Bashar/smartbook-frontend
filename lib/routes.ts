import { notFound } from 'next/navigation';

export const SANITY_PAGE_ROUTES = {
  homePage: '/',
  generalPage: (slug: string) => `/${slug}`,
  blog: (slug: string) => `/blogs/${slug}`,
};

/**
 * This function will return the route for a provided PAGE_ROUTE and
 * optional slug.
 * @param route_type keyof typeof PAGE_ROUTES
 * @returns
 */
export function getRelativeURL(
  route_type: keyof typeof SANITY_PAGE_ROUTES,
  slug: string = ''
) {
  switch (route_type) {
    case 'homePage':
      return SANITY_PAGE_ROUTES[route_type];
    case 'blog':
    case 'generalPage':
      return SANITY_PAGE_ROUTES[route_type](slug);
    default:
      notFound();
  }
}
