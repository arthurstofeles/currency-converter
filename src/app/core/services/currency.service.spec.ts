import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';
import { API_URL, CACHE_DURATION, STORAGE_KEY } from '../constants/currencies';
import { Currency } from '../models/currency';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  const mockApiResponse = {
    CADBRL: {
      bid: '3.70',
      pctChange: '0.5',
      timestamp: '1700000000',
    },
    ARSBRL: {
      bid: '0.005',
      pctChange: '-0.3',
      timestamp: '1700000000',
    },
    GBPBRL: {
      bid: '6.20',
      pctChange: '1.2',
      timestamp: '1700000000',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });

    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should return data from the cache when valid.', () => {
    const cachedCurrencies: Currency[] = [
      {
        code: 'CAD',
        value: 3.84,
        variation: 0.1,
        updatedAt: new Date(),
      },
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: cachedCurrencies,
        timestamp: Date.now(),
      }),
    );

    service.getCurrencies().subscribe((currencies) => {
      expect(currencies.length).toBe(1);
      expect(currencies[0].code).toBe('CAD');
    });

    httpMock.expectNone(() => true);
  });

  it('should call the API when there is no cache.', fakeAsync(() => {
    let result: Currency[] = [];

    service.getCurrencies().subscribe((currencies) => {
      result = currencies;
    });

    const req = httpMock.expectOne(API_URL);

    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);

    tick(1000);

    expect(result.length).toBe(3);
    expect(result[0].code).toBe('CAD');
  }));

  it('should save the cache after fetching from the API.', fakeAsync(() => {
    service.getCurrencies().subscribe();

    const req = httpMock.expectOne(API_URL);

    req.flush(mockApiResponse);
    tick(1000);

    const cached = localStorage.getItem(STORAGE_KEY);
    expect(cached).toBeTruthy();
  }));

  it('should clear the expired cache.', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: [],
        timestamp: Date.now() - CACHE_DURATION - 1000,
      }),
    );

    const result = (service as any).getCacheFromStorage();
    expect(result).toBeNull();
  });

  it('should propagate an error when the API fails.', fakeAsync(() => {
    let error: any;

    service.getCurrencies().subscribe({
      error: (err) => (error = err),
    });

    const req = httpMock.expectOne(API_URL);

    req.error(new ErrorEvent('Network error'));

    tick(1000);

    expect(error).toBeTruthy();
  }));

  it('should return the remaining cache time correctly', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data: [],
        timestamp: Date.now() - 1000,
      }),
    );

    const remaining = service.getRemainingCacheTime();
    expect(remaining).toBeGreaterThan(0);
    expect(remaining).toBeLessThanOrEqual(CACHE_DURATION);
  });
});
