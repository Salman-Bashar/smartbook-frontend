import { HeroBuilder } from '@/buildable-heroes';
import { SectionBuilder } from '@/buildable-sections';
import { ISanityGeneralPageQueryResponse } from './interface';

interface Props {
  data: ISanityGeneralPageQueryResponse;
}

export default function GeneralPageBuilder({ data }: Props) {
  const { hero, sections } = data;

  return (
    <>
      <HeroBuilder hero={hero} />
      <SectionBuilder sections={sections} />
    </>
  );
}
