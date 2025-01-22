import { SANITY_IMAGE_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/media/image';
import { groq } from 'next-sanity';

export const SANITY_NORMAL_HERO_FRAGMENT = groq`
	_type == "primaryHeroSection" => {
		_type,
		title,
		description,
		image{
			${SANITY_IMAGE_QUERY_FRAGMENT}
		}
	}
`;
