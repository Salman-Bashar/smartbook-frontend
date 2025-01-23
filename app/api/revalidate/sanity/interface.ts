export type ISanityRevalidatePayload =
  | ISanityRevalidatePayloadWithoutSlug
  | ISanityRevalidatePayloadWithSlug;

interface ISanityRevalidatePayloadWithoutSlug {
  _id: string;
  _type:
    | 'globalSettings'
    | 'header'
    | 'footer'
    // Fixed Pages
    | 'homePage'
    // Page Sections
    | 'primaryHeroSection'
    | 'richTextSection';
}

/**
 * The api might not contain slug data for a page
 * that is being newly created.
 *
 * For safety we should hanlde this case.
 */
interface ISanityRevalidatePayloadWithSlug {
  _id: string;
  _type: 'generalPage' | 'book' | 'author';
  slug?: string;
}
