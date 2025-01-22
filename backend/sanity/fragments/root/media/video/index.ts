import { groq } from 'next-sanity';

export const SANITY_VIDEO_QUERY_FRAGMENT = groq`
	type,
	type == "file" => {
		"url": file.asset->url,
	},
	type == "embed" => {
		"url": embed
	}
`;
