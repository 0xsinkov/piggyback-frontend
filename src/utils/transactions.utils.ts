import { isToday, isWithinInterval, startOfDay, subDays } from 'date-fns';
import { type TransactionDto } from '../types/user.types';

export function categorizeTransactions(transactions: TransactionDto[]) {
  const today: TransactionDto[] = [];
  const week: TransactionDto[] = [];
  const older: TransactionDto[] = [];

  const now = new Date();
  const sevenDaysAgo = startOfDay(subDays(now, 7));

  for (const transaction of transactions) {
    if (isToday(transaction.date)) {
      today.push(transaction);
    } else if (
      isWithinInterval(transaction.date, {
        start: sevenDaysAgo,
        end: now,
      })
    ) {
      week.push(transaction);
    } else {
      older.push(transaction);
    }
  }

  return {
    today,
    week,
    older,
  };
}

export function getRandomBackgroundColor(): string {
  const randomNumber = Math.floor(Math.random() * 4) + 1;

  switch (randomNumber) {
    case 1:
      return '#00C9A7';
    case 2:
      return '#99E9DC';
    case 3:
      return '#F7C1CA';
    default:
      return '#C4C1FF';
  }
}
