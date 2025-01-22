import { getRelativeURL, SANITY_PAGE_ROUTES } from '@/lib/routes';
import { isKeyOfObject } from '@/lib/helpers';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: Request) {
  const SANITY_PREVIEW_ACCESS_TOKEN = process.env.SANITY_PREVIEW_ACCESS_TOKEN;

  if (!SANITY_PREVIEW_ACCESS_TOKEN) {
    return new Response('Incomplete Preview Setup. Please contact dev team.', {
      status: 404,
    });
  }

  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const type = searchParams.get('type');
  const slug = searchParams.get('slug') || undefined;

  if (secret !== SANITY_PREVIEW_ACCESS_TOKEN) {
    return new Response('Invalid Request', { status: 401 });
  }

  if (!type) {
    return new Response('Invalid Request', { status: 404 });
  }

  if (isKeyOfObject(SANITY_PAGE_ROUTES, type)) {
    const redirect_route = getRelativeURL(type, slug);

    if (redirect_route) {
      draftMode().enable();
      redirect(redirect_route);
    }
  }

  return new Response('Invalid Request', { status: 404 });
}
