import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { HeroBuilder } from '@/buildable-heroes';
import { SectionBuilder } from '@/buildable-sections';
import { ISanityBlogPageQueryResponse } from './interface';
import { RichTextSection } from '@/buildable-sections/rich-text';
import { Typography } from '@/components/typography';

interface Props {
  data: ISanityBlogPageQueryResponse;
}

export default function BlogPageBuilder({ data }: Props) {
  const {
    hero,
    schemaMarkupDefinitions,
    sections,
    blogContent,
    isFeaturedBlog,
  } = data;

  return (
    <>
      {schemaMarkupDefinitions && (
        <SchemaMarkupScript schemaMarkups={schemaMarkupDefinitions} />
      )}
      <HeroBuilder hero={hero} />
      {isFeaturedBlog && (
        <Typography size="h3" className="rounded bg-red-500 p-2 text-white">
          Featured
        </Typography>
      )}
      <RichTextSection content={blogContent} />
      <SectionBuilder sections={sections} />
    </>
  );
}
