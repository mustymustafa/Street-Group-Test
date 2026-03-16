import { useBankHolidaysQuery } from '@/src/hooks/useBankHolidaysQuery';
import { View, Text, StyleSheet } from 'react-native';

export default function BankHolidayListScreen() {

  const { data, isLoading, error } = useBankHolidaysQuery();

  //verify data is loaded
  
  //console.log("bank holidays", data);

  //TODO: Add loading skeleton when loading
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bank holidays</Text>
      <Text style={styles.subtitle}>List screen placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
});

