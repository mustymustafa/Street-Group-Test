import type { BankHoliday, BankHolidaysApiResponse } from '@/src/types';
import { mergeAndDedupe, filterUpcomingNextFive } from '@/src/utils/bankHolidayUtils';

const BANK_HOLIDAYS_URL = 'https://www.gov.uk/bank-holidays.json';

export const fetchBankHolidays = async (): Promise<BankHoliday[]> => {
  const response = await fetch(BANK_HOLIDAYS_URL);

  if (!response.ok) {
    throw new Error('Failed to load bank holidays');
  }

  const json = (await response.json()) as BankHolidaysApiResponse;

  const merged = mergeAndDedupe(json);

  return filterUpcomingNextFive(merged);
};

