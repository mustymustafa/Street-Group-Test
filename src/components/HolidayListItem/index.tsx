import { Pressable, View } from 'react-native';
import { Card, Text, Button } from '@/src/design-system/components';
import type { BankHoliday } from '@/src/types';
import { useCalendar } from '@/src/hooks/useCalendar';
import { styles } from './styles';

export interface HolidayListItemProps {
  holiday: BankHoliday;
  onPress: () => void;
}

export function HolidayListItem({ holiday, onPress }: HolidayListItemProps) {
  const { addHolidayToCalendar } = useCalendar();

  const handleAddToCalendar = async () => {
    await addHolidayToCalendar(holiday);
  };

  return (
    <Card>
      <Pressable onPress={onPress}>
        <Text variant="headingMd" style={styles.title}>
          {holiday.title}
        </Text>
        <Text variant="body" tone="secondary" style={styles.meta}>
          {holiday.date} • {holiday.regions.join(', ')}
        </Text>
      </Pressable>

      <View style={styles.actionsRow}>
        <Button
          variant="secondary"
          label="Add to calendar"
          onPress={handleAddToCalendar}
          leftIcon={<Text variant="body">📅</Text>}
        />
      </View>
    </Card>
  );
}

