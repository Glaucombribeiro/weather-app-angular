import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // openweathermapAPI version 2.5
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '5e1dd1bb2a8fb6ec095cdc0f366e1f6f'; 

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    // URL with template strings
    return this.http.get(`${this.apiUrl}?q=${city}&units=metric&appid=${this.apiKey}&lang=pt_br`);
  }
}