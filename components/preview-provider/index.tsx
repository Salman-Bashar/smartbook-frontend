/**
 * Followed from https://github.com/sanity-io/next-sanity/blob/main/packages/next-sanity/PREVIEW-app-router.md
 */

'use client';

import LiveQueryProvider from 'next-sanity/preview';
import { suspend } from 'suspend-react';
import { CustomButton } from '../button';
import { usePathname } from 'next/navigation';

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol('@/backend/sanity/client');

interface Props {
  children: React.ReactNode;
  token?: string;
}

export default function PreviewProvider({ children, token }: Props) {
  const path = usePathname();
  const { client } = suspend(
    () => import('@/backend/sanity/client'),
    [UniqueKey]
  );

  if (!token) throw new TypeError('Missing token');

  return (
    <LiveQueryProvider client={client(false)} token={token} logger={console}>
      {children}
      <CustomButton
        type="link"
        disabled={false}
        href={`/api/disable-draft?path=${path}`}
        colorScheme="primary"
        className="fixed bottom-1 left-1/2 -translate-x-1/2"
      >
        Exit Preview
      </CustomButton>
    </LiveQueryProvider>
  );
}
