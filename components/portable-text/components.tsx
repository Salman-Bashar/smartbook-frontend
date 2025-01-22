import dynamic from 'next/dynamic';
import { ReactNode, Children } from 'react';
import clsx from 'clsx';
import { PortableTextComponents } from '@portabletext/react';
import {
  ISanityPortableTextImage,
  ISanityPortableTextVideo,
} from '@/backend/sanity/fragments/root/portable-text/interface';
import { ISanityCode } from '@/backend/sanity/fragments/root/common';
import { extractSanityLink } from '@/lib/extract-sanity-link';
import { generateImageUrl } from '@/backend/sanity/image-builder';
import { CustomLink } from '../custom-link';
import { Typography } from '../typography';
import Image from 'next/image';
import { VideoPlayer } from '../video-player';
const CodeElement = dynamic(() => import('./sub-components/code'));

/*
  In order to render portable text we call PortableText component and pass our api data as value
  and our component rendering instructions as components prop.

  <PortableText
    value={PortableTextSample}
    components={myPortableTextComponents}
  />

    Relevant links:
    https://portabletext.github.io/types/ (types)
    https://www.npmjs.com/package/@portabletext/react (components)
    https://www.npmjs.com/package/@portabletext/react

*/
export const portableTextComponents: PortableTextComponents = {
  /**
   * Blocks are top level objects in a portable text array. We look at the
   * style attribute.
   */
  block: {
    h1: ({ children }) => {
      if (isEmptyBlock(children)) {
        return <br />;
      }
      return <Typography size="h1">{children}</Typography>;
    },
    h2: ({ children }) => {
      if (isEmptyBlock(children)) {
        return <br />;
      }
      return <Typography size="h2">{children}</Typography>;
    },
    h3: ({ children }) => {
      if (isEmptyBlock(children)) {
        return <br />;
      }
      return <Typography size="h3">{children}</Typography>;
    },
    normal: ({ children }) => {
      if (isEmptyBlock(children)) {
        return <br />;
      }
      return <Typography size="p1">{children}</Typography>;
    },
    blockquote: ({ children }) => {
      if (isEmptyBlock(children)) {
        return <br />;
      }

      return (
        <Typography
          className={
            'overflow-hidden rounded-md bg-slate-300 p-6 md:p-8 lg:p-10 xl:p-12'
          }
          size="p1"
        >
          {children}
        </Typography>
      );
    },
  },
  /**
   * Marks are inline stylings (bold, emphasis, italic) for text and links.
   */
  marks: {
    link: ({ value, children }) => {
      const link = extractSanityLink(value);

      if (link && children) {
        return (
          <CustomLink
            className={'text-blue-600 underline'}
            {...link}
            label={children.toString()}
          />
        );
      } else {
        return <></>;
      }
    },
    'text-color-1': ({ children }) => {
      return <span className={'text-yellow-600'}>{children}</span>;
    },
    'text-color-2': ({ children }) => {
      return <span className={'text-yellow-400'}>{children}</span>;
    },
    'text-color-3': ({ children }) => {
      return <span className={'text-yellow-200'}>{children}</span>;
    },
    'highlight-1': ({ children }) => {
      return <span className="text-yellow-100">{children}</span>;
    },
  },
  list: {
    bullet: ({ children, value: { level } }) => {
      const listStyleClasses = ['list-[square]', 'list-disc', 'list-[circle]'];

      const bulletListClasses = clsx('ml-6 md:ml-7 xl:ml-8 list-outside', [
        listStyleClasses[level % listStyleClasses.length],
      ]);

      return <ul className={bulletListClasses}>{children}</ul>;
    },
    number: ({ children, value: { level } }) => {
      const listStyleClasses = [
        'list-[lower-roman]',
        'list-decimal',
        'list-[lower-alpha]',
      ];

      const numberListClasses = clsx('ml-6 md:ml-7 xl:ml-8 list-outside', [
        listStyleClasses[level % listStyleClasses.length],
      ]);

      return <ol className={numberListClasses}>{children}</ol>;
    },
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  /**
   * Custom blocks in rich text.
   */
  types: {
    portableTextImage: ({ value }) => {
      const portablTextImage = value as ISanityPortableTextImage;

      const image = generateImageUrl({
        source: portablTextImage,
        useCdn: false,
      });

      if (image) {
        return (
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={image.lqip}
            alt={image.alt || 'Image'}
          />
        );
      } else {
        return <></>;
      }
    },
    portableTextVideo: ({ value }) => {
      const portablTextVideo = value as ISanityPortableTextVideo;

      if (portablTextVideo.url) {
        return (
          <VideoPlayer
            url={portablTextVideo.url}
            width={'100%'}
            height={'auto'}
          />
        );
      }
    },
    code: ({ value }) => {
      const code: ISanityCode = value;

      return <CodeElement code={code} />;
    },
    iframe: ({ value }) => {
      const iframeValue = value as { embedLink: string };

      return (
        <iframe
          loading={'eager'}
          src={iframeValue.embedLink}
          className="aspect-video"
          width={'100%'}
        />
      );
    },
  },
};

/**
 * This function will return true if a block contains one child
 * with an empty string.
 *
 * This function is used to render <br/> tags.
 * @method isEmptyBlock
 * @param {ReactNode} children
 * @returns boolean
 */
const isEmptyBlock = (children: ReactNode) => {
  return Children.count(children) == 1 && children?.toString() == '';
};
