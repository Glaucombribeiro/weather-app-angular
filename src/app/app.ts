import { Component, signal } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar';
import { WeatherCardComponent } from './components/weather-card/weather-card';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBarComponent, WeatherCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  weatherCards = signal<any[]>([]);

  constructor(private weatherService: WeatherService) {}

  searchCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (response) => {
        this.weatherCards.update((cards) => {
          const cityName = this.normalizeCityName(response.name);
          const cityAlreadyExists = cards.some(
            (card) => this.normalizeCityName(card.name) === cityName,
          );

          return cityAlreadyExists ? cards : [response, ...cards];
        });
        console.log('Dados recebidos:', response);
      },
      error: (err) => {
        console.error('Erro ao buscar cidade:', err);
        alert('Cidade nao encontrada!');
      },
    });
  }

  removeWeatherCard(cityId: number) {
    this.weatherCards.update((cards) => cards.filter((card) => card.id !== cityId));
  }

  private normalizeCityName(city: string) {
    return city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
