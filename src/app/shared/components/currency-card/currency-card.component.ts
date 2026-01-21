import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../../../core/models/currency';
import { CurrencyValueColorPipe } from '../../pipes/currency-value-color.pipe';

@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [CommonModule, CurrencyValueColorPipe],
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss',
})
export class CurrencyCardComponent {
  @Input({ required: true }) currency!: Currency;
}
