import { useRouter } from 'expo-router';
import { useBankHolidaysQuery } from '@/src/hooks/useBankHolidaysQuery';
import { Layout, Text } from '@/src/design-system/components';
import { HolidayListItem } from '@/src/components/HolidayListItem';
import { FlatList, View } from 'react-native';
import { styles } from '@/app/styles/bankHolidayList.styles';

export default function BankHolidayListScreen() {
  const router = useRouter();
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
        showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <HolidayListItem holiday={item} onPress={() => router.push(`/edit/${item.id}`)} />
          )}
        />
      )}
    </Layout>
  );
}

