import type { BankHoliday, BankHolidaysApiResponse, RegionKey } from '@/src/types';
import { compareIsoDatesAsc, isWithinNextSixMonths, todayUtc, parseIsoDate } from '@/src/utils/dateUtils';

export const mergeAndDedupe = (data: BankHolidaysApiResponse): BankHoliday[] => {
  const map = new Map<string, BankHoliday>();

  const regions: RegionKey[] = ['england-and-wales', 'scotland', 'northern-ireland'];

  regions.forEach((regionKey) => {
    const region = data[regionKey];
    region.events.forEach((event) => {
      const id = `${event.date}-${event.title}`;
      const existing = map.get(id);

      if (existing) {
        if (!existing.regions.includes(regionKey)) {
          existing.regions.push(regionKey);
        }
        return;
      }

      map.set(id, {
        id,
        title: event.title,
        date: event.date,
        regions: [regionKey],
        notes: event.notes || undefined,
        bunting: event.bunting,
      });
    });
  });

  const merged = Array.from(map.values());

  merged.sort((a, b) => compareIsoDatesAsc(a.date, b.date));

  return merged;
};

export const filterUpcomingNextFive = (holidays: BankHoliday[]): BankHoliday[] => {
  const from = todayUtc();

  const filtered = holidays.filter((holiday) => {
    if (!holiday.date) return false;
    const date = parseIsoDate(holiday.date);
    if (date < from) return false;
    return isWithinNextSixMonths(holiday.date, from);
  });

  filtered.sort((a, b) => compareIsoDatesAsc(a.date, b.date));

  return filtered.slice(0, 5);
};

