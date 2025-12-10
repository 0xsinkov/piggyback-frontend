import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-background mx-auto mt-auto w-full px-4 md:px-16">
      <div className="flex items-center justify-between py-8">
        <Link href={PUBLIC_PAGES_URLS.HOME}>
          <Image alt="logo" src="/shared/logo.svg" width={100} height={40} />
        </Link>
        <p className="text-sm">&copy; 2025 Relume. All rights reserved.</p>
      </div>
    </footer>
  );
}
