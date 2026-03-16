import type { ReactNode } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { colors } from '@/src/design-system/theme/colors';
import { Text } from '../Text';
import { styles } from './styles';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  leftIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  label,
  onPress,
  style,
  disabled,
  leftIcon,
}: ButtonProps) {
  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
        ? colors.secondary
        : 'transparent';

  const borderColor = variant === 'secondary' ? colors.borderSubtle : 'transparent';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled ? colors.surfaceMuted : backgroundColor,
          borderColor,
          opacity: pressed && !disabled ? 0.9 : 1,
        },
        style,
      ]}
    >
      {leftIcon}
      <Text
        variant="body"
        tone="primary"
        style={[
          styles.label,
          {
            color:
              variant === 'primary' || variant === 'secondary'
                ? colors.background
                : colors.textPrimary,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
