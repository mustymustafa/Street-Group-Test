import type { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}
