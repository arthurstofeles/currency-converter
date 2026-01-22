export interface Currency {
  code: string;
  value: number;
  variation: number;
  updatedAt: Date;
}

export interface CurrencyMeta {
  code: 'CAD' | 'ARS' | 'GBP';
  name: string;
}
