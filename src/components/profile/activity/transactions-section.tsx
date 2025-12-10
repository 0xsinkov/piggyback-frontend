'use client';

import type { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { formatDate } from 'date-fns';
import { useTransactions } from '@root/src/hooks/user/use-transactions';
import { PUBLIC_PAGES_URLS } from '@root/src/constants/routes.constants';
import {
  categorizeTransactions,
  getRandomBackgroundColor,
} from '@root/src/utils/transactions.utils';
import type { TransactionDto } from '@root/src/types/user.types';
import { Icons } from '../../icons';
import { useEffect } from 'react';

export function TransactionsSection(): JSX.Element {
  const router = useRouter();
  const { data: transactions, isLoading } = useTransactions();

  useEffect(() => {
    if (!isLoading && (!transactions || !transactions.data)) {
      router.push(PUBLIC_PAGES_URLS.HOME);
    }
  }, [transactions, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!transactions || !transactions.data) {
    return <div />;
  }

  const { today, week, older } = categorizeTransactions(transactions.data);

  return (
    <div className="flex max-w-125 flex-col gap-8">
      <h2 className="text-2xl font-bold text-black">Latest transactions</h2>
      <TransactionCategory title="Today" transactions={today} />
      <TransactionCategory title="Last 7 Days" transactions={week} />
      <TransactionCategory title="All" transactions={older} />
    </div>
  );
}

function TransactionCategory({
  title,
  transactions,
}: {
  title: string;
  transactions: TransactionDto[];
}): JSX.Element | null {
  if (!transactions.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-medium text-black">{title}</p>
      <div className="flex flex-col gap-4">
        {transactions.map((t) => (
          <div
            key={t.hash}
            className="flex items-center justify-between rounded-lg border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex size-9 items-center justify-center rounded-full"
                style={{ backgroundColor: getRandomBackgroundColor() }}
              >
                <Icons.Transfer />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-black">Cash withdrawal</p>
                <p className="text-purple-dark text-xs font-medium">
                  {formatDate(t.date, 'd MMMM h:mm aa')}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold">
              {t.amount} {t.symbol}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
