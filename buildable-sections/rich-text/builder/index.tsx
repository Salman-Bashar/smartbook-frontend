import { RichTextSection } from '..';
import { IRichTextSection } from '../interface';
import { ISanityRichTextSection } from './interface';

export function RichTextSectionBuilder({ content }: ISanityRichTextSection) {
  const sectionProps: IRichTextSection = {
    content,
  };

  return <RichTextSection {...sectionProps} />;
}
