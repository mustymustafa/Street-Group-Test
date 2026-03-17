import { StyleSheet } from 'react-native';
import { colors } from '@/src/design-system/theme/colors';
import { spacing } from '@/src/design-system/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  title: {
    width: '70%',
    height: 20,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  meta: {
    width: '50%',
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
  regions: {
    width: '40%',
    height: 14,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
  },
});
