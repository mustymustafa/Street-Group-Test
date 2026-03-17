# Hooks

Custom React hooks that encapsulate data access and side-effect logic.

## `useBankHolidaysQuery`

The primary data hook. Wraps TanStack Query's `useQuery` to fetch bank holidays from the API.

- On mount, hydrates the React Query cache from AsyncStorage so cached data is available immediately when offline.
- On a successful network fetch, writes the latest data back to AsyncStorage.
- `networkMode: 'offlineFirst'` ensures cached data is returned without waiting for the network.
- Exposes `data`, `isLoading`, `error`, `refetch`, and `isRefetching` for the list screen.

## `useHolidayById`

Reads a single holiday from the React Query cache by `id`. Used by the edit screen to avoid a separate network request.

Returns `{ holiday, list }` — both are needed so the edit screen can update the full list in the cache on save.

## `useCalendar`

Wraps `expo-calendar` to request calendar permission and create an all-day event for a given holiday.

Returns `{ addHolidayToCalendar }` which resolves to `{ ok: boolean, error?: string }`.
