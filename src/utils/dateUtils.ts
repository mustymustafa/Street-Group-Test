const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const todayUtc = (): Date => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
};

export const parseIsoDate = (iso: string): Date => {
  // API returns yyyy-mm-dd, treat as UTC midnight for stable comparisons
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const isWithinNextSixMonths = (iso: string, from: Date = todayUtc()): boolean => {
  const date = parseIsoDate(iso);
  if (date < from) return false;

  const sixMonthsLater = new Date(from);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  return date.getTime() <= sixMonthsLater.getTime();
};

export const compareIsoDatesAsc = (a: string, b: string): number => {
  return parseIsoDate(a).getTime() - parseIsoDate(b).getTime();
};

