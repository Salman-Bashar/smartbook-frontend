import { groq } from 'next-sanity';

export const SANITY_LINK_QUERY_FRAGMENT = groq`
  addLink,
	disabled,
	openNewTab,
	label,
	type,
	href,
	type == "internal" => {
		reference->{
			_type,
			seo{
				slug
			}
		}
	}
`;
