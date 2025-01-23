import dynamic from 'next/dynamic';
import { ISanitySections } from './interface';
const RichTextSectionBuilder = dynamic(() =>
  import('./rich-text/builder').then((mod) => mod.RichTextSectionBuilder)
);

interface Props {
  sections?: ISanitySections;
}

export function SectionBuilder({ sections }: Props) {
  if (sections && sections.length > 0) {
    return (
      <>
        {sections.map((section, index) => {
          switch (section._type) {
            case 'richTextSection': {
              return <RichTextSectionBuilder {...section} key={index} />;
            }
            default:
              return (
                <section key={'default' + index}>
                  <div className="flex min-h-screen items-center justify-center">
                    <div className="rounded-10  bg-col-6 text-col-1 mx-auto max-w-[1200px] px-6 py-10">
                      <h2 className="text-center text-2xl font-bold xl:text-4xl ">
                        Section builder not implemented
                      </h2>
                    </div>
                  </div>
                </section>
              );
          }
        })}
      </>
    );
  }

  return <></>;
}
