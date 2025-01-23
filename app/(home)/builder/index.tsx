import { HeroBuilder } from '@/buildable-heroes';
import { SectionBuilder } from '@/buildable-sections';
import { ISanityHomePageQueryResponse } from './interface';

interface Props {
  data: ISanityHomePageQueryResponse;
}

export default function HomePageBuilder({ data }: Props) {
  const { hero, sections } = data;

  return (
    <>
      <HeroBuilder hero={hero} />
      <SectionBuilder sections={sections} />
    </>
  );
}
