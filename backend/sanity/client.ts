import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Used by `PreviewProvider`
export const token = process.env.SANITY_API_READ_TOKEN;

/**
 * # CAUTION
 * Do not use the client to fetch content. Use `sanityFetch`
 * instead.
 * This should only be used with the image builder
 * @param useCdn
 * @returns
 */
export function client(useCdn: boolean) {
  return createClient({
    projectId,
    dataset,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    useCdn,
  });
}
