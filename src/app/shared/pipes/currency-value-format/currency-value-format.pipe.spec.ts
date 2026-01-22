import { CurrencyValueFormatPipe } from './currency-value-format.pipe';

describe('CurrencyValueFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyValueFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
