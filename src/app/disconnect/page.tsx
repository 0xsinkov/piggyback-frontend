'use client';

import { useEffect, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { removeAccessToken } from '@src/utils/token-storage.utils';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';

function Page(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    removeAccessToken();
    router.push(PUBLIC_PAGES_URLS.HOME);
    router.refresh();
  }, [router]);

  return <div />;
}

export default Page;
