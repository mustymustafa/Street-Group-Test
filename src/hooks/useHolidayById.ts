import { useQueryClient } from '@tanstack/react-query';
import { BANK_HOLIDAYS_QUERY_KEY } from '@/src/hooks/useBankHolidaysQuery';
import type { BankHoliday } from '@/src/types';

export function useHolidayById(id: string | undefined) {
  const queryClient = useQueryClient();
  const list = queryClient.getQueryData<BankHoliday[]>(BANK_HOLIDAYS_QUERY_KEY);
  const holiday = id != null ? list?.find((h) => h.id === id) : undefined;
  return { holiday, list };
}
