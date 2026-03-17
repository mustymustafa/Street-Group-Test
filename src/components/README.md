# Components

Feature-specific components that are not part of the design system.

## `HolidayListItem`

Renders a single bank holiday card in the list. Supports:
- Pressing the card to navigate to the edit screen
- Swipe left (via `react-native-swipeout-component`) to reveal a delete button
- Adding the holiday to the device calendar via `useCalendar`
- Toggling to a "Added to calendar" state after a successful calendar add
- A confirmation modal before confirming a delete

**Props:** `holiday`, `onPress`, `onDelete`, `onSwipeOpen`, `onSwipeClose`

---

## `HolidayListItemSkeleton`

A shimmer placeholder shown in place of `HolidayListItem` during the initial data load. Built with React Native's `Animated` API — no third-party dependency.

---

## `ConfirmationModal`

A generic modal that asks the user to confirm or cancel an action. Used for both save-on-edit and delete confirmation.

**Props:** `visible`, `message`, `confirmLabel`, `cancelLabel`, `onConfirm`, `onCancel`
