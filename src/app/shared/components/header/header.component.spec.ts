import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with correct class', () => {
    const header = fixture.debugElement.query(By.css('header.app-header'));
    expect(header).toBeTruthy();
  });

  it('should render logo image', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('should have correct image src and alt', () => {
    const img: HTMLImageElement = fixture.debugElement.query(
      By.css('img'),
    ).nativeElement;

    expect(img.src).toContain('/assets/logo.svg');
    expect(img.alt).toBe('Currency Converter');
  });
});
