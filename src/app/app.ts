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
  private readonly storageKey = 'weather-app-cards';
  weatherCards = signal<any[]>([]);

  constructor(private weatherService: WeatherService) {
    this.weatherCards.set(this.loadStoredCards());
  }

  searchCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (response) => {
        this.weatherCards.update((cards) => {
          const cityName = this.normalizeCityName(response.name);
          const cityAlreadyExists = cards.some(
            (card) => this.normalizeCityName(card.name) === cityName,
          );

          const updatedCards = cityAlreadyExists ? cards : [response, ...cards];
          this.storeCards(updatedCards);

          return updatedCards;
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
    this.weatherCards.update((cards) => {
      const updatedCards = cards.filter((card) => card.id !== cityId);
      this.storeCards(updatedCards);

      return updatedCards;
    });
  }

  private loadStoredCards() {
    try {
      const storedCards = localStorage.getItem(this.storageKey);

      return storedCards ? JSON.parse(storedCards) : [];
    } catch {
      return [];
    }
  }

  private storeCards(cards: any[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cards));
    } catch {
      console.warn('Nao foi possivel salvar as cidades no localStorage.');
    }
  }

  private normalizeCityName(city: string) {
    return city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
