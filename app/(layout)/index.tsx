import { sanityFetch } from '@/backend/sanity/fetch';
import LiveQuery from '@sanity/preview-kit/live-query';
import { draftMode } from 'next/headers';
import LayoutBuilder from './builder';
import { ISanityLayoutData } from './builder/interface';
import { SANITY_LAYOUT_QUERY } from './builder/query';
import Preview from './builder/preview';
import { REVALIDATE_TAGS } from '../api/revalidate/common/constants';

interface Props {
  children: React.ReactNode;
}

export async function Layout({ children }: Props) {
  const sanityData = await sanityFetch<ISanityLayoutData>({
    query: SANITY_LAYOUT_QUERY,
    revalidate: 3600,
    tags: [REVALIDATE_TAGS.GLOBAL_SETTINGS, REVALIDATE_TAGS.LAYOUT],
  });

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={SANITY_LAYOUT_QUERY}
      initialData={sanityData}
      as={Preview}
    >
      <LayoutBuilder data={sanityData}>{children}</LayoutBuilder>
    </LiveQuery>
  );
}
