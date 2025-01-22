import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { HeroBuilder } from '@/buildable-heroes';
import { SectionBuilder } from '@/buildable-sections';
import { ISanityGeneralPageQueryResponse } from './interface';

interface Props {
  data: ISanityGeneralPageQueryResponse;
}

export default function GeneralPageBuilder({ data }: Props) {
  const { hero, schemaMarkupDefinitions, sections } = data;

  return (
    <>
      {schemaMarkupDefinitions && (
        <SchemaMarkupScript schemaMarkups={schemaMarkupDefinitions} />
      )}
      <HeroBuilder hero={hero} />
      <SectionBuilder sections={sections} />
    </>
  );
}
