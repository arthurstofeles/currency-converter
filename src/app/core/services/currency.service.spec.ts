import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  const API_URL =
    'https://economia.awesomeapi.com.br/json/last/CAD-BRL,ARS-BRL,GBP-BRL';

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch currencies from API', () => {
    service.getCurrencies().subscribe((currencies) => {
      expect(currencies.length).toBe(3);
      expect(currencies[0].code).toBe('CAD');
      expect(currencies[1].code).toBe('ARS');
      expect(currencies[2].code).toBe('GBP');
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');

    req.flush(mockApiResponse);
  });

  it('should set loading true while fetching', () => {
    const loadingStates: boolean[] = [];

    service.loading$.subscribe((value) => {
      loadingStates.push(value);
    });

    service.getCurrencies().subscribe();

    const req = httpMock.expectOne(API_URL);
    req.flush(mockApiResponse);

    expect(loadingStates).toEqual([false, true, false]);
  });

  it('should handle error and return empty array', () => {
    let errorMessage: string | null = null;

    service.error$.subscribe((error) => {
      if (error) {
        errorMessage = error;
      }
    });

    service.getCurrencies().subscribe((currencies) => {
      expect(currencies.length).toBe(0);
    });

    const req = httpMock.expectOne(API_URL);
    req.error(new ErrorEvent('Network error'));

    expect(errorMessage).toBeTruthy();
  });
});
