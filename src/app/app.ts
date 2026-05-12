import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar'; // Importe o componente novo
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent], // Adicione o SearchBarComponent aqui
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  // Criamos a variável e dizemos que ela pode ser "any" por enquanto 
  // (depois usamos aquela Interface/Model que criamos)
  weatherData: any; 

  constructor(private weatherService: WeatherService) {}

  searchCity(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (response) => {
        this.weatherData = response; // Aqui os dados da API são salvos
        console.log('Dados recebidos:', this.weatherData);
      },
      error: (err) => {
        console.error('Erro ao buscar cidade:', err);
        alert('Cidade não encontrada!');
      }
    });
  }
}