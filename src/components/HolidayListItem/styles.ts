import { StyleSheet } from 'react-native';
import { spacing } from '@/src/design-system/theme/spacing';
import { colors } from '@/src/design-system/theme/colors';

export const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
  },
  actionsRow: {
    marginTop: spacing.sm,
  },
});

