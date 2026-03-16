import { StyleSheet } from 'react-native';
import { spacing } from '@/src/design-system/theme/spacing';
import { colors } from '@/src/design-system/theme/colors';

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
  listContent: {
    paddingBottom: spacing.lg,
  },
  separator: {
    height: spacing.sm,
  },
});

export const itemStyles = StyleSheet.create({
  title: {
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
  },
});

