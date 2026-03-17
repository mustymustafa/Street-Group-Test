# API

Handles fetching data from the UK Government bank holidays endpoint.

## `fetchBankHolidays`

Fetches `https://www.gov.uk/bank-holidays.json`, merges all three regions (England & Wales, Scotland, Northern Ireland), deduplicates holidays that appear in multiple regions, and returns the next 5 upcoming holidays within the next 6 months.

Throws an error if the network response is not OK — React Query will surface this as `error` state in the consuming hook.

> The function includes a deliberate 5-second delay for demo purposes to make the skeleton loading state visible.
