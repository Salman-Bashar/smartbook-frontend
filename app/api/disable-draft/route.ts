import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');

  draftMode().disable();

  if (path) {
    redirect(path);
  } else {
    redirect(`/`);
  }
}
