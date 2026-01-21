import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../../../core/models/currency';

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss',
})
export class CurrencyCardComponent {
  @Input({ required: true }) currency!: Currency;
}
