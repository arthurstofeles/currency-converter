import { CurrencyMeta } from "../models/currency";

export const CURRENCY_META: CurrencyMeta[] = [
  { code: 'CAD', name: 'Dólar Canadense' },
  { code: 'ARS', name: 'Peso Argentino' },
  { code: 'GBP', name: 'Libra Esterlina' },
];

export const CACHE_DURATION = 3 * 60 * 1000;

export const STORAGE_KEY = 'currency_cache';

export const API_URL =
    'https://economia.awesomeapi.com.br/json/last/CAD-BRL,ARS-BRL,GBP-BRL';
