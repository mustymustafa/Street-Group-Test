import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBankHolidays } from '@/src/api/bankHolidays';
import { bankHolidaysCache } from '@/src/store/asyncStorage';
import type { BankHoliday } from '@/src/types';

export const BANK_HOLIDAYS_QUERY_KEY = ['bankHolidays'];

export const useBankHolidaysQuery = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const hydrate = async () => {
      const cached = await bankHolidaysCache.get<BankHoliday[]>();
      if (cached && !queryClient.getQueryData(BANK_HOLIDAYS_QUERY_KEY)) {
        queryClient.setQueryData(BANK_HOLIDAYS_QUERY_KEY, cached);
      }
    };
    hydrate();
  }, [queryClient]);

  return useQuery<BankHoliday[]>({
    queryKey: BANK_HOLIDAYS_QUERY_KEY,
    queryFn: async () => {
      const data = await fetchBankHolidays();
      await bankHolidaysCache.set(data);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    networkMode: 'offlineFirst',
  });
};
