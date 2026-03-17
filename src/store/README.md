# Store

Persistence layer for offline support.

## `asyncStorage.ts`

A typed wrapper around `@react-native-async-storage/async-storage` scoped to the bank holidays cache key.

| Method | Description |
|---|---|
| `bankHolidaysCache.get<T>()` | Reads and JSON-parses the cached holiday list. Returns `null` if nothing is stored. |
| `bankHolidaysCache.set<T>(data)` | JSON-serialises and writes the holiday list to storage. |

Used by `useBankHolidaysQuery` to hydrate the React Query cache on mount and persist fresh data after each successful fetch.

> `@react-native-async-storage/async-storage@1.x` is used because version 3.x requires a native dev build and is not compatible with Expo Go.
