import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Layout, Text, Input, Button } from '@/src/design-system/components';
import { ConfirmationModal } from '@/src/components/ConfirmationModal';
import { editHolidaySchema } from '@/src/utils/validation';
import { BANK_HOLIDAYS_QUERY_KEY } from '@/src/hooks/useBankHolidaysQuery';
import { useHolidayById } from '@/src/hooks/useHolidayById';
import type { BankHoliday } from '@/src/types';
import { styles } from '@/app/styles/editHoliday.styles';

export default function EditHolidayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { holiday, list } = useHolidayById(id);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState<Date | null>(null);

  useEffect(() => {
    if (holiday) {
      setTitle(holiday.title);
      setDate(holiday.date);
    }
  }, [holiday]);

  const handleSave = () => {
    setTitleError(null);
    setDateError(null);
    const parsed = editHolidaySchema.safeParse({ title: title.trim(), date: date.trim() });
    if (!parsed.success) {
      const err = parsed.error.flatten().fieldErrors;
      setTitleError(err.title?.[0] ?? null);
      setDateError(err.date?.[0] ?? null);
      return;
    }
    //only show confirm modal if there are changes
    const hasChanges =
      holiday &&
      (parsed.data.title !== holiday.title || parsed.data.date !== holiday.date);
    if (hasChanges) {
      setShowConfirm(true);
    } else {
      router.back();
    }
  };

  const handleConfirm = () => {
    if (!holiday || !list) return;
    const parsed = editHolidaySchema.safeParse({ title: title.trim(), date: date.trim() });
    if (!parsed.success) {
      setShowConfirm(false);
      return;
    }
    const updated: BankHoliday = { ...holiday, title: parsed.data.title, date: parsed.data.date };
    const nextList = list.map((h) => (h.id === id ? updated : h));
    queryClient.setQueryData(BANK_HOLIDAYS_QUERY_KEY, nextList);
    setShowConfirm(false);
    router.back();
  };

  if (id == null) {
    return (
      <Layout>
        <Text tone="danger">Missing holiday id.</Text>
      </Layout>
    );
  }

  if (list && !holiday) {
    return (
      <Layout>
        <Text tone="secondary">Holiday not found.</Text>
      </Layout>
    );
  }

  if (!holiday) {
    return router.navigate('/');
  }

  return (
    <Layout>
      <Text variant="headingLg" style={styles.heading}>
        Edit holiday
      </Text>
      <Text variant="body" tone="secondary" style={styles.subtitle}>
        Title and date must be within the next 6 months.
      </Text>

      <Input
        label="Title"
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. New Year's Day"
        error={titleError ?? undefined}
      />
      <Input
        label="Date"
        value={date}
        onChangeText={setDate}
        placeholder="2025-01-01"
        editable={false}
        onPressIn={() => {
          if (holiday) {
            const [y, m, d] = holiday.date.split('-').map(Number);
            setPickerDate(new Date(y, (m ?? 1) - 1, d ?? 1));
          } else {
            setPickerDate(new Date());
          }
          setShowDatePicker(true);
        }}
        error={dateError ?? undefined}
      />

      {!showDatePicker && (
        <Button label="Save changes" onPress={handleSave} style={styles.actions} />
      )}

      <ConfirmationModal
        visible={showConfirm}
        message="Save these changes?"
        confirmLabel="Save"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />

      {showDatePicker && pickerDate && (
        <Layout>
          <Text variant="headingMd" style={styles.heading}>
            Choose date
          </Text>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={pickerDate}
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                setPickerDate(selectedDate);
              }
            }}
          />
          <Button
            label="Done"
            onPress={() => {
              if (pickerDate) {
                const year = pickerDate.getFullYear();
                const month = String(pickerDate.getMonth() + 1).padStart(2, '0');
                const day = String(pickerDate.getDate()).padStart(2, '0');
                setDate(`${year}-${month}-${day}`);
              }
              setShowDatePicker(false);
            }}
            style={styles.actions}
          />
          <Button
            label="Cancel"
            variant="secondary"
            onPress={() => setShowDatePicker(false)}
          />
        </Layout>
      )}
    </Layout>
  );
}
