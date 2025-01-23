import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { ISanityLayoutData } from './interface';
import { Header } from './sub-sections/header';
import { Footer } from './sub-sections/footer';
import { headerProps } from './sub-sections/header/story-props';
import { footerProps } from './sub-sections/footer/story-props';
// import { extractSanityLinks } from '@/lib/extract-sanity-link';

export interface ILayoutBuilderProps {
  data: ISanityLayoutData;
  children: React.ReactNode;
}

export default function LayoutBuilder({ data, children }: ILayoutBuilderProps) {
  //const headerMenuLinks = extractSanityLinks(data.header.menuLinks);
  // const footerMenuLinks = extractSanityLinks(data.footer.menuLinks);

  return (
    <>
      {data.schemaMarkupDefinitions && (
        <SchemaMarkupScript schemaMarkups={data.schemaMarkupDefinitions} />
      )}
      <Header menuLinks={headerProps.menuLinks} />
      {children}
      <Footer menuLinks={footerProps.menuLinks} />
    </>
  );
}
