import { editHolidaySchema } from '@/src/utils/validation';

const isoDate = (daysFromNow: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
};

it('rejects an empty title and accepts a valid title with an in-range date', () => {
  const invalid = editHolidaySchema.safeParse({ title: '', date: isoDate(30) });
  expect(invalid.success).toBe(false);
  expect(invalid.error?.flatten().fieldErrors.title?.[0]).toBe('Title is required');

  const valid = editHolidaySchema.safeParse({ title: 'May Day', date: isoDate(30) });
  expect(valid.success).toBe(true);
});
