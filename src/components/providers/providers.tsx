'use client';

import { type JSX, type PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { TanstackQueryProvider } from '@src/components/providers/tanstack-query-provider';
import { SolanaWalletProvider } from '@src/components/providers/solana-provider';

export function Providers({ children }: PropsWithChildren): JSX.Element {
  return (
    <SolanaWalletProvider>
      <TanstackQueryProvider>
        <Toaster />

        {children}
      </TanstackQueryProvider>
    </SolanaWalletProvider>
  );
}
