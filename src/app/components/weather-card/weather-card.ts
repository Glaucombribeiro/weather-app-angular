import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss',
})
export class WeatherCardComponent {
  @Input({ required: true }) weather!: any;
  @Output() close = new EventEmitter<void>();
  closeConfirmationVisible = false;

  get iconCode() {
    return this.weather?.weather?.[0]?.icon ?? '';
  }

  get iconUrl() {
    return this.iconCode ? `https://openweathermap.org/img/wn/${this.iconCode}@4x.png` : '';
  }

  get description() {
    return this.weather?.weather?.[0]?.description ?? 'Clima atual';
  }

  get isNight() {
    return this.iconCode.endsWith('n');
  }

  get periodLabel() {
    return this.isNight ? 'Noite' : 'Dia';
  }

  get windSpeed() {
    return this.weather?.wind?.speed;
  }

  requestClose() {
    this.closeConfirmationVisible = true;
  }

  cancelClose() {
    this.closeConfirmationVisible = false;
  }

  confirmClose() {
    this.close.emit();
  }
}
