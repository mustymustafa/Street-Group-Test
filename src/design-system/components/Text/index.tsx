import type { ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { colors } from '@/src/design-system/theme/colors';
import { typography, type TextVariant } from '@/src/design-system/theme/typography';
import { styles } from './styles';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  tone?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}

export function Text({ variant = 'body', tone = 'primary', style, children, ...rest }: TextProps) {
  const variantStyle = typography[variant];

  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: variantStyle.fontSize,
          fontWeight: variantStyle.fontWeight,
          lineHeight: variantStyle.lineHeight,
          color:
            tone === 'primary'
              ? colors.textPrimary
              : tone === 'secondary'
                ? colors.textSecondary
                : colors.danger,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
