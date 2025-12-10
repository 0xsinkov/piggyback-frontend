'use client';

import { type JSX } from 'react';
import Image from 'next/image';
import { useRequestAuthLink } from '@root/src/hooks/auth/use-request-auth-link';
import { Button } from '@src/components/ui/button';

export function ConnectTwitterButton(): JSX.Element {
  const { mutateAsync: requestAuthLink } = useRequestAuthLink();

  const handleConnectTwitter = async (): Promise<void> => {
    const authLink = await requestAuthLink();

    if (authLink.data) {
      window.location.replace(authLink.data.redirectLink);
    }
  };

  return (
    <Button
      onClick={handleConnectTwitter}
      className="flex w-fit items-center gap-3"
    >
      <p>Connect With</p>
      <Image
        src="/shared/twitter.svg"
        alt="Twitter"
        width={18}
        height={16}
      />{' '}
    </Button>
  );
}
