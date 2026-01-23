import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loader container', () => {
    const loader = fixture.debugElement.query(
      By.css('.app-loader'),
    );
    expect(loader).toBeTruthy();
  });

  it('should render loader image', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
  });

  it('should have correct image src and alt', () => {
    const img: HTMLImageElement = fixture.debugElement.query(
      By.css('img'),
    ).nativeElement;

    expect(img.src).toContain('assets/loader.svg');
    expect(img.alt).toBe('Loading');
  });
});
