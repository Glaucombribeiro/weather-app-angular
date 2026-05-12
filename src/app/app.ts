import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  weatherData = signal<any | null>(null);

  constructor(private weatherService: WeatherService) {}

  searchCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (response) => {
        this.weatherData.set(response);
        console.log('Dados recebidos:', response);
      },
      error: (err) => {
        this.weatherData.set(null);
        console.error('Erro ao buscar cidade:', err);
        alert('Cidade nao encontrada!');
      },
    });
  }
}
