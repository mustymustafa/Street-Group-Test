# Design System

Reusable UI primitives and theme tokens. All components are built with plain `StyleSheet` — no third-party UI library.

## Theme

Located in `theme/`:

| File | Purpose |
|---|---|
| `colors.ts` | All colour values (`primary`, `secondary`, `danger`, `surface`, `text*`, etc.) |
| `typography.ts` | Font size, weight, and line-height per variant (`headingLg`, `headingMd`, `body`, `caption`) |
| `spacing.ts` | Spacing scale (`xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`) |

## Components

Located in `components/`:

| Component | Purpose |
|---|---|
| `Text` | Typed text with `variant` (`headingLg`, `headingMd`, `body`, `caption`) and `tone` (`primary`, `secondary`, `danger`) props |
| `Button` | Pressable with `primary` (soft blue) and `secondary` (black) variants, optional `leftIcon`, and `disabled` state |
| `Card` | A surface container with border, rounded corners, and padding |
| `Input` | Labelled text input with optional `error` message and `editable` toggle |
| `Layout` | Full-screen wrapper with safe area insets. Renders a `ScrollView` by default; pass `scroll={false}` for a plain `View` (required when a `FlatList` is a direct child) |

All components are exported from `components/index.ts` for a single import point.
