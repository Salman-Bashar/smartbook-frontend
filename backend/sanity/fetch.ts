import 'server-only';

import { draftMode } from 'next/headers';
import { ClientConfig, type QueryParams } from 'next-sanity';
import { client, token } from './client';

interface SanityFetchArgs {
  query: string;
  params?: QueryParams;
  revalidate?: number;
  tags?: string[];
  useCdn?: boolean;
  /**
   * This should be set to true.
   *
   * For instance when generating static params or site map.
   */
  disablePreview?: boolean;
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate,
  tags,
  useCdn = false,
  disablePreview = false,
}: SanityFetchArgs) {
  let clientConfig: ClientConfig = {};
  let isDraftMode = false;

  if (!disablePreview) {
    isDraftMode = draftMode().isEnabled && !disablePreview;
  }

  if (isDraftMode) {
    if (!token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      );
    }

    clientConfig = {
      token,
      perspective: 'previewDrafts',
    };
  }

  return client(useCdn).fetch<QueryResponse>(query, params, {
    ...clientConfig,
    next: {
      revalidate: isDraftMode ? 0 : revalidate, // time based revalidation
      tags, // for tag-based revalidation
    },
  });
}
