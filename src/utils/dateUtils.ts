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

export const formatDisplayDate = (iso: string): string => {
  const date = parseIsoDate(iso);
  const formatter = new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const base = formatter.format(date); // e.g. "24 Apr 2026"
  // Insert a period after the abbreviated month to match "Apr. 24, 2026"
  const withComma = base.replace(/(\d{1,2}) (\w{3}) (\d{4})/, '$2. $1, $3');
  return withComma;
};


