import type { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface LayoutProps {
  children: ReactNode;
  style?: ViewStyle;
  scroll?: boolean;
}

export function Layout({ children, style, scroll = true }: LayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[styles.contentContainer, style]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.contentContainer, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}
