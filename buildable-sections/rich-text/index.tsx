import { IRichTextSection } from './interface';
import { cn } from '@/lib/shadcn/utils';
import { PortableTextComponent } from '@/components/portable-text';

/**
 * `RichTextSection` is a functional component that represents a rich text section.
 */
export const RichTextSection = ({ content }: IRichTextSection) => {
  return (
    <section className={cn('py-10')}>
      <div className={cn('mx-auto max-w-[62.5rem]')}>
        <PortableTextComponent content={content} />
      </div>
    </section>
  );
};
