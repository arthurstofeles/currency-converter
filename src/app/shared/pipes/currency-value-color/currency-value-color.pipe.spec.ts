import { CurrencyValueColorPipe } from './currency-value-color.pipe';

describe('CurrencyValueColorPipe', () => {
  let pipe: CurrencyValueColorPipe;

  beforeEach(() => {
    pipe = new CurrencyValueColorPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string when value is undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return red when value is less than or equal to 1', () => {
    expect(pipe.transform(0)).toBe('red');
    expect(pipe.transform(1)).toBe('red');
  });

  it('should return green when value is greater than 1 and less than or equal to 5', () => {
    expect(pipe.transform(2)).toBe('green');
    expect(pipe.transform(5)).toBe('green');
  });

  it('should return blue when value is greater than 5', () => {
    expect(pipe.transform(6)).toBe('blue');
    expect(pipe.transform(10)).toBe('blue');
  });
});
