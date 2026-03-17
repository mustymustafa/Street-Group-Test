import { StyleSheet } from 'react-native';
import { spacing } from '@/src/design-system/theme/spacing';
import { colors } from '@/src/design-system/theme/colors';

export const styles = StyleSheet.create({
  swipeout: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    marginBottom: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
  },
  regions: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionsRow: {
    marginTop: spacing.sm,
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 14,
  }
});
