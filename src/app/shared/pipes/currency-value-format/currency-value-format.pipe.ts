import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe, getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'brlValue',
  standalone: true,
})
export class CurrencyValueFormatPipe implements PipeTransform {
  private decimalPipe = new DecimalPipe('pt-BR');
  private symbol = getCurrencySymbol('BRL', 'narrow');

  transform(value: number | null | undefined): string {
    if (value == null) return '-';

    const formatted =
      value < 1
        ? this.decimalPipe.transform(value, '1.3-3')
        : this.decimalPipe.transform(value, '1.2-2');

    return `${this.symbol} ${formatted}`;
  }
}
