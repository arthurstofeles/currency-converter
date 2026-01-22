import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';
import { CommonModule } from '@angular/common';
import {
  combineLatest,
  interval,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Currency } from '../../core/models/currency';
import {
  CurrencyCardComponent,
  CurrencyCardState,
} from '../../shared/components/currency-card/currency-card.component';
import { CURRENCY_META } from '../../core/constants/currencies';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // loading$!: Observable<boolean>;
  // error$!: Observable<string | null>;
  // // cardState$!: Observable<CurrencyCardState>;

  currencyMeta = CURRENCY_META;

  currenciesMap: Partial<Record<string, Currency>> = {};

  cardState: CurrencyCardState = 'loading';

  private destroy$ = new Subject<void>();

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    interval(3 * 60 * 1000)
      .pipe(startWith(0), takeUntil(this.destroy$))
      .subscribe(() => this.loadCurrencies());
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
