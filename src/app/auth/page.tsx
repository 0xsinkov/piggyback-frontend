'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthenticate } from '@root/src/hooks/auth/use-authenticate';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import { setAccessToken } from '@root/src/utils/token-storage.utils';

function AuthCallback(): JSX.Element {
  const params = useSearchParams();
  const router = useRouter();

  const code = params.get('code');
  const state = params.get('state');

  const { mutateAsync: authenticate } = useAuthenticate();

  useEffect(() => {
    async function handleAuth(): Promise<void> {
      if (code && state) {
        const response = await authenticate({ code, state });

        if (response.data) {
          const { accessToken } = response.data;

          setAccessToken(accessToken);
          router.push(PUBLIC_PAGES_URLS.HOME);
        } else {
          router.push(PUBLIC_PAGES_URLS.HOME);
        }
      }
    }

    handleAuth();
  }, [authenticate, code, router, state]);

  return <div />;
}

function Page(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}

export default Page;
