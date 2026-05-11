import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('weather-app');
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // WeatherAPI test with a city name
    this.weatherService.getWeather('Sao Paulo').subscribe({
      next: (response) => {
        console.log('Dados do Clima:', response);
      },
      error: (err) => {
        console.error('Erro ao buscar clima:', err);
      }
    });
  }
}
