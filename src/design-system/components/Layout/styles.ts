import { StyleSheet } from 'react-native';
import { colors } from '@/src/design-system/theme/colors';
import { spacing } from '@/src/design-system/theme/spacing';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
