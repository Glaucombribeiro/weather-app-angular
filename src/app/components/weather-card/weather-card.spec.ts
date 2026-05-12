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
});
