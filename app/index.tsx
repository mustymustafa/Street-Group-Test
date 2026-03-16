import { useBankHolidaysQuery } from '@/src/hooks/useBankHolidaysQuery';
import { Layout, Card, Text } from '@/src/design-system/components';
import { FlatList, View } from 'react-native';
import type { BankHoliday } from '@/src/types';
import { styles, itemStyles } from '@/app/styles/bankHolidayList.styles';

export default function BankHolidayListScreen() {

  const { data, isLoading, error } = useBankHolidaysQuery();

  return (
    <Layout scroll={false}>
      <Text variant="headingLg" style={styles.heading}>
        Bank holidays
      </Text>
      <Text variant="body" tone="secondary" style={styles.subtitle}>
        Next 5 UK bank holidays in the next 6 months.
      </Text>

      {isLoading && (
        <View style={styles.stateContainer}>
          <Text tone="secondary">Loading bank holidays…</Text>
        </View>
      )}

      {error && !isLoading && (
        <View style={styles.stateContainer}>
          <Text tone="danger">Unable to load bank holidays. Pull to refresh later.</Text>
        </View>
      )}

      {data && !isLoading && !error && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <HolidayListItem holiday={item} />}
        />
      )}
    </Layout>
  );
}

interface HolidayListItemProps {
  holiday: BankHoliday;
}

function HolidayListItem({ holiday }: HolidayListItemProps) {
  return (
    <Card>
      <Text variant="headingMd" style={itemStyles.title}>
        {holiday.title}
      </Text>
      <Text variant="body" tone="secondary" style={itemStyles.meta}>
        {holiday.date} • {holiday.regions.join(', ')}
      </Text>
    </Card>
  );
}

