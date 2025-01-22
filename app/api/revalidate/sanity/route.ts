import { type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { ISanityRevalidatePayload } from './interface';
import {
  INVALID_PAYLOAD,
  INVALID_SECRET,
} from '../common/response-constructors';
import { revalidatePath, revalidateTag } from 'next/cache';
import { REVALIDATE_TAGS } from '../common/constants';
import { SANITY_PAGE_ROUTES, getRelativeURL } from '@/lib/routes';
import { getReferenceDocuments } from './utils/get-references';

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } =
      await parseBody<ISanityRevalidatePayload>(
        req,
        process.env.SANITY_REVALIDATE_SECRET
      );

    // Reject request with invalid signature
    if (!isValidSignature) {
      return new Response(INVALID_SECRET, {
        status: 401,
      });
    }

    if (!body) {
      return new Response(INVALID_PAYLOAD, { status: 400 });
    }

    const result = await handleRevalidate(body);

    if (result == true) {
      return new Response('Triggered Revalidate Successfully.');
    } else {
      return new Response(INVALID_PAYLOAD, { status: 500 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response('Unknown Error', { status: 500 });
    }
  }
}

/**
 * This function will handle calling revalidateTags and
 * revalidatePath functions.
 *
 * It will be used recursively to handle revalidation of referencing
 * documents.
 */
async function handleRevalidate(payload: ISanityRevalidatePayload) {
  const documentType = payload._type;

  switch (documentType) {
    /**
     * We have to update the following on global settings update:
     * - All queries that query sanity sections.
     * - All query that query seo from sanity.
     * - All query that has promo related content.
     */
    case 'globalSettings': {
      revalidateTag(REVALIDATE_TAGS.GLOBAL_SETTINGS);

      console.log('Content Revalidation: Global Settings');

      return true;
    }
    case 'footer':
    case 'header': {
      revalidateTag(REVALIDATE_TAGS.LAYOUT);

      console.log('Content Revalidation: Layout');

      return true;
    }
    case 'homePage': {
      revalidatePath(SANITY_PAGE_ROUTES.homePage);

      console.log('Content Revalidation: Home Page');

      return true;
    }
    case 'generalPage':
    case 'blog': {
      if (payload.slug) {
        const path = getRelativeURL(payload._type, payload.slug);

        revalidatePath(path);

        console.log(`Content Revalidation: ${payload._type}. Path: ${path}`);

        return true;
      }

      console.error(
        `Content Revalidation: Failed to trigger revalidate. Payload: ${payload._type}, ${payload._id}`
      );

      return false;
    }
    /**
     * When revalidating page and hero sections we have to find
     * pages that are referencing these sections and update them.
     */
    case 'richTextSection': {
      const referencedDocuments = await getReferenceDocuments(payload._id);

      if (referencedDocuments !== null) {
        for (const doc of referencedDocuments) {
          await handleRevalidate(doc);
        }

        console.log(
          `Content Revalidation: Rich Text Section. Section: ${payload._type}`
        );
        return true;
      }

      console.error(
        'Content Revalidation: Rich Text Section. References not found'
      );

      return false;
    }
    case 'primaryHeroSection': {
      const referencedDocuments = await getReferenceDocuments(payload._id);

      if (referencedDocuments !== null) {
        for (const doc of referencedDocuments) {
          await handleRevalidate(doc);
        }

        console.log(
          `Content Revalidation: Hero Section. Section: ${payload._type}`
        );
        return true;
      }

      console.error('Content Revalidation: Hero Section. References not found');

      return false;
    }
    default: {
      console.error(`Invalid _type: ${documentType}`);
      return true;
    }
  }
}
