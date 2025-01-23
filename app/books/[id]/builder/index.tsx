import { HeroBuilder } from '@/buildable-heroes';
import { SectionBuilder } from '@/buildable-sections';
import { ISanityBookPageQueryResponse } from './interface';

interface Props {
  data: ISanityBookPageQueryResponse;
}

export default function BlogPageBuilder({ data }: Props) {
  const { hero, sections } = data;

  return (
    <>
      <HeroBuilder hero={hero} />

      <SectionBuilder sections={sections} />
    </>
  );
}
