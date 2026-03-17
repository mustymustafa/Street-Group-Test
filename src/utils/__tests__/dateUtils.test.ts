import { formatDisplayDate } from '@/src/utils/dateUtils';

it('formats an ISO date string as "Mon. DD, YYYY"', () => {
  expect(formatDisplayDate('2026-04-24')).toBe('Apr. 24, 2026');
});
