import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CurrencyService } from '../../core/services/currency.service';
import { Currency } from '../../core/models/currency';
import { of, throwError } from 'rxjs';
import { CACHE_DURATION } from '../../core/constants/currencies';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let currencyServiceSpy: jasmine.SpyObj<CurrencyService>;

  registerLocaleData(localePt);

  const mockCurrencies: Currency[] = [
    {
      code: 'CAD',
      value: 3.8,
      variation: 0.1,
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    currencyServiceSpy = jasmine.createSpyObj('CurrencyService', [
      'getCurrencies',
      'getRemainingCacheTime',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: CurrencyService, useValue: currencyServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load currencies on init', fakeAsync(() => {
    currencyServiceSpy.getRemainingCacheTime.and.returnValue(0);
    currencyServiceSpy.getCurrencies.and.returnValue(of(mockCurrencies));

    fixture.detectChanges();
    tick();

    expect(currencyServiceSpy.getCurrencies).toHaveBeenCalled();
    expect(component.cardState).toBe('success');
    expect(component.currenciesMap['CAD']).toBeDefined();
  }));

  it('should set error state when service fails', fakeAsync(() => {
    currencyServiceSpy.getRemainingCacheTime.and.returnValue(0);
    currencyServiceSpy.getCurrencies.and.returnValue(
      throwError(() => new Error()),
    );

    fixture.detectChanges();
    tick();

    expect(component.cardState).toBe('error');
  }));

  it('should reload currencies when retry is triggered', () => {
    currencyServiceSpy.getCurrencies.and.returnValue(of(mockCurrencies));

    component.loadCurrencies();

    expect(currencyServiceSpy.getCurrencies).toHaveBeenCalled();
  });

  it('should auto refresh after cache duration', fakeAsync(() => {
    currencyServiceSpy.getRemainingCacheTime.and.returnValue(CACHE_DURATION);
    currencyServiceSpy.getCurrencies.and.returnValue(of(mockCurrencies));

    fixture.detectChanges();
    expect(currencyServiceSpy.getCurrencies).toHaveBeenCalled();

    tick(CACHE_DURATION);
    expect(currencyServiceSpy.getCurrencies).toHaveBeenCalledTimes(2);
  }));
});
