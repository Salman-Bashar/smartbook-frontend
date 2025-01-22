import { sanityFetch } from '@/backend/sanity/fetch';
import { groq } from 'next-sanity';
import { ISanityRevalidatePayload } from '../interface';

export async function getReferenceDocuments(id: string) {
  const data = await sanityFetch<ISanityRevalidatePayload[]>({
    query: SANITY_GET_REFERENCES_QUERY,
    params: {
      id,
    },
    useCdn: false,
    disablePreview: true,
  });

  return data;
}

const SANITY_GET_REFERENCES_QUERY = groq`
	*[!(_id in path("drafts.**")) &&  references($id)]{
		_id,
		_type,
		"slug": seo.slug.current
	}
`;
