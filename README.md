# Street Group — Bank Holiday App

A mobile app that displays the next 5 upcoming UK bank holidays within the next 6 months, with edit, delete, and calendar integration features.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go installed on your device or simulator

### Setup

```bash
npm install
npm start
```

Scan the QR code with Expo Go (iOS/Android) or press `i` / `a` to open in a simulator.

### Tests

```bash
npm test
```

---

## Features

- Fetches and merges bank holidays from all 3 UK regions (England & Wales, Scotland, Northern Ireland)
- Add a holiday to the device calendar
- Deduplicates holidays that appear across multiple regions
- Displays the next 5 holidays within 6 months
- Edit holiday title and date with validation
## Bonus features
- Swipe left to delete a holiday
- Offline support — cached data is shown when there is no network
- Pull to refresh
- Skeleton loading state (Subtle animations )
- Confirmation modal before saving

---

## Packages & Tools

| Package | Purpose |
|---|---|
| `expo` (~54) | Managed React Native platform |
| `expo-router` | File-based navigation |
| `@tanstack/react-query` | Data fetching, caching, and cache mutation |
| `zod` | Runtime schema validation for the edit form |
| `@react-native-async-storage/async-storage` | Persisting the holiday cache for offline use |
| `@react-native-community/datetimepicker` | Native date picker in the edit screen |
| `expo-calendar` | Requesting calendar permission and creating events |
| `react-native-swipeout-component` | Swipe-to-delete gesture on list items |
| `react-native-safe-area-context` | Safe area insets for notched devices |
| `typescript` | Static typing |
| `jest` + `ts-jest` | Unit testing |

---

## Project Structure

```
app/                   # Expo Router screens and screen-level styles
src/
  api/                 # API fetch function
  components/          # Feature-specific components
  design-system/       # Reusable UI primitives and theme tokens
  hooks/               # Custom React hooks
  store/               # Persistence layer (AsyncStorage)
  types/               # Shared TypeScript types
  utils/               # Pure business logic and helpers
```

## Documentation

Each folder has its own focused `README.md` rather than one large document. I prefer this approach as it keeps documentation close to the code it describes and easier to maintain as the project grows.

| Folder | README |
|---|---|
| `src/api/` | [API](src/api/README.md) |
| `src/components/` | [Components](src/components/README.md) |
| `src/design-system/` | [Design System](src/design-system/README.md) |
| `src/hooks/` | [Hooks](src/hooks/README.md) |
| `src/store/` | [Store](src/store/README.md) |
| `src/utils/` | [Utils](src/utils/README.md) |
