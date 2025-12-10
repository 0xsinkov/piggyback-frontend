'use client';

import type { JSX } from 'react';
import { WalletMinimalIcon } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '../../ui/button';

export function ConnectWallet(): JSX.Element {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = (): void => {
    if (connected) {
      disconnect().catch(() => {});
    } else {
      setVisible(true);
    }
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <Button className="w-full gap-3" variant="default" onClick={handleClick}>
      {connected && publicKey
        ? formatAddress(publicKey.toString())
        : 'Connect Wallet'}
      <WalletMinimalIcon className="size-6 text-black" />
    </Button>
  );
}
