import { StyleSheet } from 'react-native';
import { colors } from '@/src/design-system/theme/colors';
import { spacing } from '@/src/design-system/theme/spacing';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primary,
  },
});
