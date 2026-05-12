import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBarComponent {
  cityName = '';

  @Output() onSearch = new EventEmitter<string>();

  onSubmit() {
    const city = this.cityName.trim();

    if (city) {
      this.onSearch.emit(city);
      this.cityName = '';
    }
  }
}
