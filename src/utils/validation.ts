import { z } from 'zod';
import { isWithinNextSixMonths } from '@/src/utils/dateUtils';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const editHolidaySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z
    .string()
    .regex(isoDateRegex, 'Date must be yyyy-mm-dd')
    .refine((s) => isWithinNextSixMonths(s), 'Date must be within the next 6 months'),
});

export type EditHolidayInput = z.infer<typeof editHolidaySchema>;
