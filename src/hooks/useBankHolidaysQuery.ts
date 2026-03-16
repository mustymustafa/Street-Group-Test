import { useQuery } from '@tanstack/react-query';
import { fetchBankHolidays } from '@/src/api/bankHolidays';
import type { BankHoliday } from '@/src/types';

export const BANK_HOLIDAYS_QUERY_KEY = ['bankHolidays'];

export const useBankHolidaysQuery = () => {
  return useQuery<BankHoliday[]>({
    queryKey: BANK_HOLIDAYS_QUERY_KEY,
    queryFn: fetchBankHolidays,
    staleTime: 5 * 60 * 1000,
  });
};

