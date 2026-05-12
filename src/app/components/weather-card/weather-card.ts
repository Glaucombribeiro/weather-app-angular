import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss',
})
export class WeatherCardComponent {
  @Input({ required: true }) weather!: any;
}
