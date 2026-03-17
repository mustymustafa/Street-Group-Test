import { StyleSheet } from 'react-native';
import { spacing } from '@/src/design-system/theme/spacing';

export const styles = StyleSheet.create({
  heading: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  stateContainer: {
    paddingVertical: spacing.lg,
  },
  skeletonContainer: {
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  listContent: {
    paddingBottom: 80,
  },
  separator: {
    height: spacing.md,
  },
  swipeoutText: {
    textAlign: 'right',
    padding: spacing.sm,
  },
});

