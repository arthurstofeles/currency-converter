import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Currency } from '../../core/models/currency';
import { CurrencyCardComponent } from '../../shared/components/currency-card/currency-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  currencies$!: Observable<Currency[]>;
  loading$! : Observable<boolean>
  error$! : Observable<string | null>;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loading$ = this.currencyService.loading$;
    this.error$ = this.currencyService.error$;
    this.currencies$ = this.currencyService.getCurrencies();
  }
}
