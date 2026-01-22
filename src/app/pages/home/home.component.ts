import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';
import { CommonModule } from '@angular/common';
import { interval, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { Currency } from '../../core/models/currency';
import { CurrencyCardComponent } from '../../shared/components/currency-card/currency-card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyCardComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currencies$!: Observable<Currency[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loading$ = this.currencyService.loading$;
    this.error$ = this.currencyService.error$;
    this.currencies$ = interval(3 * 60 * 1000).pipe(
      startWith(0),
      switchMap(() => this.currencyService.getCurrencies()),
    );
  }
}
