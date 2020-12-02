import { Component, Input, OnInit } from '@angular/core';

export enum WidgetType {
  FullScreenTemperature = 'full-screen-temperature',
  Weather = 'weather',
  TempVariation = 'temp-variation',
  TempProperty = 'temp-property',
  Forecast = 'forecast',
}

export enum WeatherType {
  Sun = 'sun',
  Clouds = 'clouds',
  Rain = 'rain',
  Smog = 'smog',
}

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent implements OnInit {
  @Input() widgetType: WidgetType = undefined;
  @Input() todayTempForecast: number = undefined;
  @Input() weatherType: WeatherType = undefined;
  @Input() weatherDescription: string = undefined;
  @Input() tempMin: number = undefined;
  @Input() tempMax: number = undefined;
  @Input() propertyIcon: string = undefined;
  @Input() propertyValue: string = undefined;
  @Input() propertyDescription: string = undefined;
  @Input() forecastDay: string = undefined;
  @Input() forecastMin: number = undefined;
  @Input() forecastMax: number = undefined;

  constructor() {}

  ngOnInit(): void {}

  getWeatherWidgetImageFromType(): string {
    switch (this.weatherType) {
      case WeatherType.Sun:
        return 'assets/weather-type-sunny.svg';
      case WeatherType.Clouds:
        return 'assets/weather-type-clouds.svg';
      case WeatherType.Rain:
        return 'assets/weather-type-clouds.svg';
      case WeatherType.Smog:
        return 'assets/weather-type-smog.svg';
      default:
        return undefined;
    }
  }
}
