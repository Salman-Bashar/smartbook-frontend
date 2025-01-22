import { ISanityRichTextSection } from './rich-text/builder/interface';

/**
 * When you have more type of section you will update the interface like so:
 * type ISanitySections = (ISanityRichTextSection | ISanityFAQSection)[]
 */
export type ISanitySections = ISanityRichTextSection[];
