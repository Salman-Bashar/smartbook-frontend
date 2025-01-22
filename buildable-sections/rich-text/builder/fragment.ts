import { SANITY_PORTABLE_TEXT_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/portable-text';
import { groq } from 'next-sanity';

export const SANITY_RICH_TEXT_SECTION_FRAGMENT = groq`
    _type == 'richTextSection' => @-> {
        _type,
        content[]{
            ${SANITY_PORTABLE_TEXT_QUERY_FRAGMENT}
        }
    }
`;
