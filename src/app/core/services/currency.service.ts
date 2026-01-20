import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Currency } from '../models/currency';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  private readonly API_URL =
    'https://economia.awesomeapi.com.br/json/last/CAD-BRL,ARS-BRL,GBP-BRL';

  getCurrencies(): Observable<Currency[]> {
    return this.http
      .get<any>(this.API_URL)
      .pipe(map((response) => this.mapResponse(response)));
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
