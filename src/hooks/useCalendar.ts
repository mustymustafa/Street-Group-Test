import { useCallback } from 'react';
import * as Calendar from 'expo-calendar';
import type { BankHoliday } from '@/src/types';

interface AddHolidayResult {
  ok: boolean;
  error?: string;
}

export function useCalendar() {
  const addHolidayToCalendar = useCallback(
    async (holiday: BankHoliday): Promise<AddHolidayResult> => {
      try {
        const { status } = await Calendar.requestCalendarPermissionsAsync();

        if (status !== 'granted') {
          return { ok: false, error: 'Calendar permission not granted' };
        }

        const defaultCalendar = await Calendar.getDefaultCalendarAsync();

        const start = new Date(`${holiday.date}T00:00:00`);
        const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

        await Calendar.createEventAsync(defaultCalendar.id, {
          title: holiday.title,
          startDate: start,
          endDate: end,
          allDay: true,
        });

        return { ok: true };
      } catch {
        return { ok: false, error: 'Unable to add event to calendar' };
      }
    },
    [],
  );

  return { addHolidayToCalendar };
}

