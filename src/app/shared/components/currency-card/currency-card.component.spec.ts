import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyCardComponent } from './currency-card.component';
import { Currency } from '../../../core/models/currency';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('CurrencyCardComponent', () => {
  let component: CurrencyCardComponent;
  let fixture: ComponentFixture<CurrencyCardComponent>;

  registerLocaleData(localePt);

  const mockCurrency: Currency = {
    code: 'CAD',
    value: 3.84,
    variation: 0.12,
    updatedAt: new Date('2026-01-22T15:17:15'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyCardComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyCardComponent);
    component = fixture.componentInstance;
    component.title = 'Dólar Canadense';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when state is loading', () => {
    component.state = 'loading';
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('app-loader'));
    expect(loader).toBeTruthy();
  });

  it('should show error state with retry button', () => {
    component.state = 'error';
    component.errorMessage = 'Erro ao carregar';
    fixture.detectChanges();

    const errorText = fixture.debugElement.query(By.css('.error-state p'));
    const button = fixture.debugElement.query(By.css('app-button'));

    expect(errorText.nativeElement.textContent).toContain('Erro ao carregar');
    expect(button).toBeTruthy();
  });

  it('should emit retry event when retry button is clicked', () => {
    component.state = 'error';
    spyOn(component.retry, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('app-button'));
    button.triggerEventHandler('clicked');

    expect(component.retry.emit).toHaveBeenCalled();
  });

  it('should show currency data when state is success', () => {
    component.state = 'success';
    component.currency = mockCurrency;

    fixture.detectChanges();

    const value = fixture.debugElement.query(By.css('.currency-value'));
    const variation = fixture.debugElement.query(By.css('.box-info p'));
    const updatedAt = fixture.debugElement.queryAll(By.css('.box-info p'))[1];

    expect(value.nativeElement.textContent).toContain('R$');
    expect(variation.nativeElement.textContent).toContain('0,12');
    expect(updatedAt.nativeElement.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
  });
});
