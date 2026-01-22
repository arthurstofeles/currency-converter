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

export interface AwesomeApiCurrency {
  bid: string;
  pctChange: string;
  timestamp: string;
  name?: string;
}

export type AwesomeApiResponse = Record<string, AwesomeApiCurrency>;
