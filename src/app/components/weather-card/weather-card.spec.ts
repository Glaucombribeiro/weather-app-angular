import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardComponent } from './weather-card';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    component.weather = {
      name: 'Sao Paulo',
      main: {
        temp: 24,
        feels_like: 25,
        humidity: 70,
      },
      wind: {
        speed: 3.4,
      },
      weather: [
        {
          description: 'ceu limpo',
          icon: '01d',
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the day style when the icon is a day icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('article')?.classList).toContain('day');
  });

  it('should show confirmation buttons when the close button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLButtonElement>('.weather-card__close')?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.weather-card__confirm-actions')).toBeTruthy();
  });

  it('should emit close when the confirm button is clicked', () => {
    const closeSpy = vi.spyOn(component.close, 'emit');
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLButtonElement>('.weather-card__close')?.click();
    fixture.detectChanges();
    compiled.querySelector<HTMLButtonElement>('.weather-card__confirm-button--confirm')?.click();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should hide confirmation buttons when the cancel button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector<HTMLButtonElement>('.weather-card__close')?.click();
    fixture.detectChanges();
    compiled.querySelector<HTMLButtonElement>('.weather-card__confirm-button--cancel')?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.weather-card__confirm-actions')).toBeFalsy();
  });
});
