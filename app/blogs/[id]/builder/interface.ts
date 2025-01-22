import { ISanityCommonPageProps } from '@/backend/sanity/fragments/root/page/interface';
import { ISanityPortableText } from '@/backend/sanity/fragments/root/portable-text/interface';

export interface ISanityBlogPageQueryResponse extends ISanityCommonPageProps {
  isFeaturedBlog: boolean;
  blogContent: ISanityPortableText;
}
