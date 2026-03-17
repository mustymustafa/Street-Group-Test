# Utils

Pure functions with no React or side-effect dependencies. Each file has co-located unit tests in `__tests__/`.

## `bankHolidayUtils.ts`

Core business logic for processing the API response.

| Function | Description |
|---|---|
| `mergeAndDedupe(response)` | Merges events from all 3 regions into a single list. Holidays with the same date + title are merged into one entry and their regions are accumulated. Sorted by date ascending. |
| `filterUpcomingNextFive(holidays)` | Filters out past dates and dates beyond 6 months from today. Returns at most the 5 nearest results. |

## `dateUtils.ts`

Date helpers used across the app. All dates are treated as UTC midnight to avoid timezone-related off-by-one errors.

| Function | Description |
|---|---|
| `todayUtc()` | Returns today's date at UTC midnight. |
| `parseIsoDate(iso)` | Parses a `yyyy-mm-dd` string to a UTC midnight `Date`. |
| `isWithinNextSixMonths(iso, from?)` | Returns `true` if the date is between `from` (default: today) and 6 months later, inclusive. |
| `compareIsoDatesAsc(a, b)` | Comparator for ascending date sort. |
| `formatDisplayDate(iso)` | Formats `"2026-04-24"` as `"Apr. 24, 2026"`. |

## `validation.ts`

Zod schemas for form input validation.

| Schema | Rules |
|---|---|
| `editHolidaySchema` | `title` must be non-empty. `date` must be in `yyyy-mm-dd` format and fall within the next 6 months. |
