export type TextVariant = 'headingLg' | 'headingMd' | 'body' | 'caption';

export const typography: Record<
  TextVariant,
  { fontSize: number; fontWeight: '400' | '500' | '600'; lineHeight: number }
> = {
  headingLg: { fontSize: 28, fontWeight: '600', lineHeight: 34 },
  headingMd: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
};

