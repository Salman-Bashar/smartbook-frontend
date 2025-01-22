import { PortableText } from '@portabletext/react';
import { portableTextComponents } from './components';
import { IPortableTextComponent } from './interface';

/**
 * This element renders portable text according to custom
 * blocks and schemas used in sanity's portable text.
 * @param {object}  ICustomPortableText
 * @returns JSX.Element
 */
export function PortableTextComponent({ content }: IPortableTextComponent) {
  return (
    <article className="block space-y-3 after:clear-both after:block">
      <PortableText value={content} components={portableTextComponents} />
    </article>
  );
}
