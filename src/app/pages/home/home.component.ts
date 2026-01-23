import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';
import { CommonModule } from '@angular/common';
import { interval, Subject, switchMap, takeUntil, tap, timer } from 'rxjs';
import { Currency } from '../../core/models/currency';
import {
  CurrencyCardComponent,
  CurrencyCardState,
} from '../../shared/components/currency-card/currency-card.component';
import { CURRENCY_META, CACHE_DURATION } from '../../core/constants/currencies';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currencyMeta = CURRENCY_META;
  currenciesMap: Partial<Record<string, Currency>> = {};
  cardState: CurrencyCardState = 'loading';
  private destroy$ = new Subject<void>();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.startAutoRefresh();
  }

  loadCurrencies(): void {
    this.cardState = 'loading';

    this.currencyService.getCurrencies().subscribe({
      next: (currencies) => {
        this.currenciesMap = currencies.reduce(
          (acc, cur) => {
            acc[cur.code] = cur;
            return acc;
          },
          {} as Record<string, Currency>,
        );

        this.cardState = 'success';
      },
      error: () => {
        this.cardState = 'error';
      },
    });
  }

  private startAutoRefresh(): void {
    const initialDelay = this.currencyService.getRemainingCacheTime();

    if (initialDelay !== 0) this.loadCurrencies();

    timer(initialDelay)
      .pipe(
        tap(() => this.loadCurrencies()),

        switchMap(() =>
          interval(CACHE_DURATION).pipe(tap(() => this.loadCurrencies())),
        ),

        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
