import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  private readonly CACHE_DURATION = 3 * 60 * 1000;
  private readonly STORAGE_KEY = 'currency_cache';

  private cache: Currency[] | null = null;
  private lastFetchTime: number | null = null;

  private readonly API_URL =
    'https://economia.awesomeapi.com.br/json/last/CAD-BRL,ARS-BRL,GBP-BRL';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  getCurrencies(): Observable<Currency[]> {
    const cachedData = this.getCacheFromStorage();

    if (cachedData) {
      return of(cachedData);
    }

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<any>(this.API_URL).pipe(
      map((response) => this.mapResponse(response)),
      tap((currencies) => {
        this.saveCacheToStorage(currencies);
      }),
      catchError(() => {
        this.errorSubject.next('Algo deu errado');
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false)),
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
    let index = data.name.indexOf('/');
    let name = data.name.substring(0, index);

    return {
      code,
      name: name,
      value: Number(data.bid),
      variation: Number(data.pctChange),
      updatedAt: new Date(Number(data.timestamp) * 1000),
    };
  }

  private getCacheFromStorage(): Currency[] | null {
    const cached = localStorage.getItem(this.STORAGE_KEY);

    if (!cached) {
      return null;
    }

    const { data, timestamp } = JSON.parse(cached);

    const isValid = Date.now() - timestamp < this.CACHE_DURATION;

    if (!isValid) {
      localStorage.removeItem(this.STORAGE_KEY);
      return null;
    }

    return data.map((item: Currency) => ({
      ...item,
      updatedAt: new Date(item.updatedAt),
    }));
  }

  private saveCacheToStorage(data: Currency[]): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    );
  }
}
