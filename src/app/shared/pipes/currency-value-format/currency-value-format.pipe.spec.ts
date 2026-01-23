import { CurrencyValueFormatPipe } from './currency-value-format.pipe';

describe('CurrencyValueFormatPipe', () => {
  let pipe: CurrencyValueFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyValueFormatPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "-" when value is null or undefined', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });

  it('should format values greater than or equal to 1 with 2 decimal places', () => {
    expect(pipe.transform(3.84)).toBe('R$ 3,84');
    expect(pipe.transform(10)).toBe('R$ 10,00');
    expect(pipe.transform(5.1)).toBe('R$ 5,10');
  });

  it('should format values less than 1 with 4 decimal places', () => {
    expect(pipe.transform(0.00372416)).toBe('R$ 0,0037');
    expect(pipe.transform(0.12)).toBe('R$ 0,1200');
    expect(pipe.transform(0.9999)).toBe('R$ 0,9999');
  });

  it('should round correctly', () => {
    expect(pipe.transform(0.0034)).toBe('R$ 0,0034');
    expect(pipe.transform(0.0035)).toBe('R$ 0,0035');
  });
});
