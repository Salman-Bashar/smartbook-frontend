import { notFound } from 'next/navigation';

export const SANITY_PAGE_ROUTES = {
  homePage: '/',
  generalPage: (slug: string) => `/${slug}`,
  authors: '/authors',
  author: (slug: string) => `/authors/${slug}`,
  books: '/books',
  book: (slug: string) => `/books/${slug}`,
  user: (slug: string) => `/users/${slug}`,
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
    case 'authors':
    case 'books':
      return SANITY_PAGE_ROUTES[route_type];
    case 'generalPage':
    case 'author':
    case 'book':
      return SANITY_PAGE_ROUTES[route_type](slug);
    default:
      notFound();
  }
}
