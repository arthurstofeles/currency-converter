import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Currency } from '../../../core/models/currency';
import { CurrencyValueColorPipe } from '../../pipes/currency-value-color.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { ButtonComponent } from '../button/button.component';
import { BrlValuePipe } from '../../pipes/brl-value.pipe';

export type CurrencyCardState = 'loading' | 'error' | 'success';
@Component({
  selector: 'app-currency-card',
  standalone: true,
  imports: [CommonModule, CurrencyValueColorPipe, LoaderComponent, ButtonComponent, BrlValuePipe],
  templateUrl: './currency-card.component.html',
  styleUrl: './currency-card.component.scss',
})

export class CurrencyCardComponent {
  @Input() currency?: Currency;
  @Input() state: CurrencyCardState = 'loading';
  @Input() errorMessage?: string;
  @Input() title!: string;
  @Output() retry = new EventEmitter<void>();
}
