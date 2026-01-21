import { Pipe, PipeTransform } from '@angular/core';

export type CurrencyColor = 'red' | 'green' | 'blue';

@Pipe({
  name: 'currencyValueColor',
  standalone: true,
})
export class CurrencyValueColorPipe implements PipeTransform {
  transform(value: number): CurrencyColor {
    if (value <= 1) {
      return 'red';
    }

    if (value <= 5) {
      return 'green';
    }

    return 'blue';
  }
}
