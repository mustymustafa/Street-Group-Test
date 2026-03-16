export type RegionKey = 'england-and-wales' | 'scotland' | 'northern-ireland';

export interface BankHolidayApiEvent {
  title: string;
  date: string; // ISO yyyy-mm-dd from API
  notes: string;
  bunting: boolean;
}

export interface BankHolidayApiRegion {
  division: string;
  events: BankHolidayApiEvent[];
}

export type BankHolidaysApiResponse = Record<RegionKey, BankHolidayApiRegion>;

export interface BankHoliday {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  regions: RegionKey[];
  notes?: string;
  bunting?: boolean;
}

