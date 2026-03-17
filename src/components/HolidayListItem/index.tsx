import { useState } from 'react';
import { Alert, Pressable, Text as RNText, View } from 'react-native';
import { Swipeout } from 'react-native-swipeout-component';
import { Card, Text, Button } from '@/src/design-system/components';
import { ConfirmationModal } from '@/src/components/ConfirmationModal';
import type { BankHoliday } from '@/src/types';
import { useCalendar } from '@/src/hooks/useCalendar';
import { formatDisplayDate } from '@/src/utils/dateUtils';
import { colors } from '@/src/design-system/theme/colors';
import { styles } from './styles';

export interface HolidayListItemProps {
  holiday: BankHoliday;
  onPress: () => void;
  onDelete: () => void;
  onSwipeOpen: () => void;
  onSwipeClose: () => void;
}

export function HolidayListItem({
  holiday,
  onPress,
  onDelete,
  onSwipeOpen,
  onSwipeClose,
}: HolidayListItemProps) {
  const { addHolidayToCalendar } = useCalendar();
  const [isInCalendar, setIsInCalendar] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  //TODO if i had time: navigate to calendar app after holiday is added to calendar
  const handleAddToCalendar = async () => {
    if (isInCalendar || isAdding) return;
    setIsAdding(true);
    const result = await addHolidayToCalendar(holiday);
    if (result.ok) {
      setIsInCalendar(true);
      Alert.alert('Added to calendar', 'This bank holiday has been added to your calendar.');
    }
    setIsAdding(false);
  };

  const rightButtons = [
    {
      component: (
        <View style={styles.deleteButton}>
          <RNText style={styles.deleteButtonText}>Delete</RNText>
        </View>
      ),
      buttonBackgroundColor: colors.danger,
      onPress: () => setShowDeleteConfirm(true),
    },
  ];

  return (
    //FUN FACT!!: I AM THE AUTHOR OF THIS PACKAGE!. Published on NPM last year.
    <Swipeout
      right={rightButtons}
      autoClose
      rightBackgroundColor={colors.danger}
      onOpen={onSwipeOpen}
      onClose={onSwipeClose}
      style={styles.swipeout}
    >
      <Card>
        <Pressable onPress={onPress}>
          <Text variant="headingMd" style={styles.title}>
            {holiday.title}
          </Text>
          <Text variant="body" tone="secondary" style={styles.meta}>
            {formatDisplayDate(holiday.date)}
          </Text>
          <Text variant="body" tone="secondary" style={styles.regions}>
            {holiday.regions.join(', ')}
          </Text>
        </Pressable>

        <View style={styles.actionsRow}>
          {isInCalendar ? (
            <Text variant="body" tone="primary">
              ✅ Added to calendar
            </Text>
          ) : (
            <Button
              variant="secondary"
              label={isAdding ? 'Adding…' : 'Add to calendar'}
              onPress={handleAddToCalendar}
              disabled={isAdding}
              leftIcon={<Text variant="body"> 📅 </Text>}
            />
          )}
        </View>
      </Card>

      <ConfirmationModal
        visible={showDeleteConfirm}
        message={`Remove "${holiday.title}" from the list?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete();
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </Swipeout>
  );
}
