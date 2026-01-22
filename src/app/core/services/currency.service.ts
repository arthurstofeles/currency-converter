import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  finalize,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Currency } from '../models/currency';
import { CACHE_DURATION, STORAGE_KEY } from '../constants/currencies';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  private readonly API_URL =
    'https://economia.awesomeapi.com.br/json/last/CAD-BRL,ARS-BRL,GBP-BRL';

  getCurrencies(): Observable<Currency[]> {
    const cachedData = this.getCacheFromStorage();

    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<any>(this.API_URL).pipe(
      delay(1000),
      map((response) => this.mapResponse(response)),
      tap((currencies) => {
        this.saveCacheToStorage(currencies);
      }),
      catchError(() => {
        return throwError(() => Error);
      }),
    );
  }

  private mapResponse(response: any): Currency[] {
    return [
      this.buildCurrency('CAD', response.CADBRL),
      this.buildCurrency('ARS', response.ARSBRL),
      this.buildCurrency('GBP', response.GBPBRL),
    ];
  }

  private buildCurrency(code: string, data: any): Currency {
    return {
      code,
      value: Number(data.bid),
      variation: Number(data.pctChange),
      updatedAt: new Date(Number(data.timestamp) * 1000),
    };
  }

  private getCacheFromStorage(): Currency[] | null {
    const cached = localStorage.getItem(STORAGE_KEY);

    if (!cached) {
      return null;
    }

    const { data, timestamp } = JSON.parse(cached);

    const isValid = Date.now() - timestamp < CACHE_DURATION;

    if (!isValid) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data.map((item: Currency) => ({
      ...item,
      updatedAt: new Date(item.updatedAt),
    }));
  }

  private saveCacheToStorage(data: Currency[]): void {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    );
  }

  getRemainingCacheTime(): number {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;

    const parsed = JSON.parse(raw);
    const elapsed = Date.now() - parsed.timestamp;

    return Math.max(CACHE_DURATION - elapsed, 0);
  }
}
