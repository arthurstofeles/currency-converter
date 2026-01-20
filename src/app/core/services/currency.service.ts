import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  private readonly API_URL =
    'https://economia.awesomeapi.com.br/json/last/CAD-BRL,ARS-BRL,GBP-BRL';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  getCurrencies(): Observable<Currency[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<any>(this.API_URL).pipe(
      map((response) => this.mapResponse(response)),
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
    return {
      code,
      value: Number(data.bid),
      variation: Number(data.pctChange),
      updatedAt: new Date(Number(data.timestamp) * 1000),
    };
  }
}
