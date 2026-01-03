import type { Metadata } from 'next';
import { type JSX, type ReactNode } from 'react';
import { DM_Sans } from 'next/font/google';
import { Providers } from '@src/components/providers/providers';
import { Header } from '@root/src/components/layout/header/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Piggy Bank',
  description: 'Piggy Bank',
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
