import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'bank_holidays_cache';

export const bankHolidaysCache = {
  get: async <T>(): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  },
  set: async <T>(data: T): Promise<void> => {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  },
};
