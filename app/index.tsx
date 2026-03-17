import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useBankHolidaysQuery, BANK_HOLIDAYS_QUERY_KEY } from '@/src/hooks/useBankHolidaysQuery';
import { Layout, Text } from '@/src/design-system/components';
import { HolidayListItem } from '@/src/components/HolidayListItem';
import { HolidayListItemSkeleton } from '@/src/components/HolidayListItemSkeleton';
import { FlatList, View } from 'react-native';
import { styles } from '@/app/styles/bankHolidayList.styles';
import type { BankHoliday } from '@/src/types';

export default function BankHolidayListScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch, isRefetching } = useBankHolidaysQuery();
  const isInitialLoading = isLoading && !data;
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleDelete = (id: string) => {
    const current = queryClient.getQueryData<BankHoliday[]>(BANK_HOLIDAYS_QUERY_KEY);
    if (!current) return;
    queryClient.setQueryData(
      BANK_HOLIDAYS_QUERY_KEY,
      current.filter((h) => h.id !== id)
    );
  };

  return (
    <Layout scroll={false}>
      <Text variant="headingLg" style={styles.heading}>
        Bank holidays
      </Text>
      <Text variant="body" tone="secondary" style={styles.subtitle}>
        Next 5 UK bank holidays in the next 6 months.
      </Text>

      <Text style={styles.swipeoutText} variant="body" tone="secondary">
        swipe left to delete
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
          scrollEnabled={scrollEnabled}
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <HolidayListItem
              holiday={item}
              onPress={() => router.push(`/edit/${item.id}`)}
              onDelete={() => handleDelete(item.id)}
              onSwipeOpen={() => setScrollEnabled(false)}
              onSwipeClose={() => setScrollEnabled(true)}
            />
          )}
        />
      )}
    </Layout>
  );
}
