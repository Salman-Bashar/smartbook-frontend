import './globals.css';
import { primary } from '@/fonts';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { token } from '@/backend/sanity/client';
import { Layout } from './(layout)';

const PreviewProvider = dynamic(() => import('@/components/preview-provider'));

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(primary.variable, 'font-primary')}>
        {draftMode().isEnabled ? (
          <PreviewProvider token={token}>
            <Layout>{children}</Layout>
          </PreviewProvider>
        ) : (
          <Layout>{children}</Layout>
        )}
        <Toaster />
      </body>
    </html>
  );
}
