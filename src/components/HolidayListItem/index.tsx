import { Pressable } from 'react-native';
import { Card, Text } from '@/src/design-system/components';
import type { BankHoliday } from '@/src/types';
import { styles } from './styles';

export interface HolidayListItemProps {
  holiday: BankHoliday;
  onPress: () => void;
}

export function HolidayListItem({ holiday, onPress }: HolidayListItemProps) {
  return (
    <Pressable onPress={onPress}>
      <Card>
        <Text variant="headingMd" style={styles.title}>
          {holiday.title}
        </Text>
        <Text variant="body" tone="secondary" style={styles.meta}>
          {holiday.date} • {holiday.regions.join(', ')}
        </Text>
      </Card>
    </Pressable>
  );
}

