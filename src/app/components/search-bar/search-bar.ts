import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss'
})
export class SearchBarComponent {
  // Variável que armazena o que o usuário digita
  cityName: string = '';

  // O "emissor" que vai levar o nome da cidade para o componente pai
  @Output() onSearch = new EventEmitter<string>();

  onSubmit() {
    if (this.cityName.trim()) {
      this.onSearch.emit(this.cityName); // Dispara o evento
      this.cityName = ''; // Limpa o input após a busca
    }
  }
}