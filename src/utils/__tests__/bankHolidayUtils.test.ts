import { mergeAndDedupe, filterUpcomingNextFive } from '@/src/utils/bankHolidayUtils';
import type { BankHolidaysApiResponse } from '@/src/types';

const makeApiResponse = (overrides: Partial<BankHolidaysApiResponse> = {}): BankHolidaysApiResponse => ({
  'england-and-wales': { division: 'england-and-wales', events: [] },
  scotland: { division: 'scotland', events: [] },
  'northern-ireland': { division: 'northern-ireland', events: [] },
  ...overrides,
});

const isoDate = (daysFromNow: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
};

it('merges a holiday shared across two regions into a single entry with both regions listed', () => {
  const sharedEvent = { title: 'New Years Day', date: '2026-01-01', notes: '', bunting: true };
  const response = makeApiResponse({
    'england-and-wales': { division: 'england-and-wales', events: [sharedEvent] },
    scotland: { division: 'scotland', events: [sharedEvent] },
  });

  const result = mergeAndDedupe(response);

  expect(result).toHaveLength(1);
  expect(result[0].regions).toEqual(['england-and-wales', 'scotland']);
});

it('returns at most 5 upcoming holidays when given more than 5 valid dates', () => {
  const holidays = Array.from({ length: 10 }, (_, i) => ({
    id: `id-${i}`,
    title: `Holiday ${i}`,
    date: isoDate(i + 1),
    regions: ['england-and-wales' as const],
    bunting: false,
  }));

  const result = filterUpcomingNextFive(holidays);

  expect(result).toHaveLength(5);
});

it('excludes holidays in the past or more than 6 months away', () => {
  const holidays = [
    { id: 'past', title: 'Past Holiday', date: isoDate(-10), regions: ['england-and-wales' as const], bunting: false },
    { id: 'valid', title: 'Valid Holiday', date: isoDate(30), regions: ['england-and-wales' as const], bunting: false },
    { id: 'far', title: 'Far Future', date: isoDate(200), regions: ['england-and-wales' as const], bunting: false },
  ];

  const result = filterUpcomingNextFive(holidays);

  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('valid');
});
