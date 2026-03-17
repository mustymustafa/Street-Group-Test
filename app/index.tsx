import { useRouter } from 'expo-router';
import { useBankHolidaysQuery } from '@/src/hooks/useBankHolidaysQuery';
import { Layout, Text } from '@/src/design-system/components';
import { HolidayListItem } from '@/src/components/HolidayListItem';
import { HolidayListItemSkeleton } from '@/src/components/HolidayListItemSkeleton';
import { FlatList, View } from 'react-native';
import { styles } from '@/app/styles/bankHolidayList.styles';

export default function BankHolidayListScreen() {
  const router = useRouter();
  const { data, isLoading, error, refetch, isRefetching } = useBankHolidaysQuery();
  const isInitialLoading = isLoading && !data;

  return (
    <Layout scroll={false}>
      <Text variant="headingLg" style={styles.heading}>
        Bank holidays
      </Text>
      <Text variant="body" tone="secondary" style={styles.subtitle}>
        Next 5 UK bank holidays in the next 6 months.
      </Text>

      {isInitialLoading && (
        <View style={styles.stateContainer}>
          <View style={styles.skeletonContainer}>
            {[1, 2, 3].map((key) => (
              <HolidayListItemSkeleton key={key} />
            ))}
          </View>
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
          refreshing={isRefetching}
          onRefresh={refetch}
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

