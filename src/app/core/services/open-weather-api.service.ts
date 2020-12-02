import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import Weather from '../model/weather';
import Place from '../model/place';

// Utils
import { createHttpObservable } from '../utils/utils';

// Libraries
import * as moment from 'moment';

@Injectable({
  providedIn: 'any',
})
export class OpenWeatherApiService {
  weatherApiUrl: string = 'https://api.openweathermap.org/data/2.5/onecall';

  constructor() {}

  public getWeatherForecast(place: Place): Observable<Weather> {
    let weather$ = createHttpObservable<any>(
      `${
        this.weatherApiUrl
      }?lat=${place.lat.toString()}&lon=${place.lon.toString()}&appid=81ada4fdd34badf40c40a25238394138&exclude=minutely,hourly,alerts&units=metric&lang=sk`
    ).pipe(map((res) => res));

    let weather: Weather = {
      place: undefined,
      timeZone: '',
      dailyForecast: [
        {
          weatherCondition: { main: '', description: '', icon: '' },
          temperature: { day: 0, min: 0, max: 0 },
        },
        {
          weatherCondition: { main: '', description: '', icon: '' },
          temperature: { day: 0, min: 0, max: 0 },
        },
        {
          weatherCondition: { main: '', description: '', icon: '' },
          temperature: { day: 0, min: 0, max: 0 },
        },
        {
          weatherCondition: { main: '', description: '', icon: '' },
          temperature: { day: 0, min: 0, max: 0 },
        },
      ],
    };
    weather.place = place;

    weather$.subscribe((obsWeatherData) => {
      if (obsWeatherData) {
        weather.timeZone = obsWeatherData.timezone;
        weather.dailyForecast.forEach((day, index) => {
          (day.dt = moment.unix(obsWeatherData.daily[index].dt)),
            (day.sunrise = moment.unix(obsWeatherData.daily[index].sunrise)),
            (day.sunset = moment.unix(obsWeatherData.daily[index].sunset)),
            (day.temperature = obsWeatherData.daily[index].temp),
            (day.pressure = obsWeatherData.daily[index].pressure),
            (day.humidity = obsWeatherData.daily[index].humidity),
            (day.wind = obsWeatherData.daily[index].wind_speed),
            (day.weatherCondition = {
              main: obsWeatherData.daily[index].weather[0].main,
              description: obsWeatherData.daily[index].weather[0].description,
              icon: obsWeatherData.daily[index].weather[0].icon,
            });
        });
        console.log(weather);
      }
    });
    console.log(weather);
    return of(weather);
  }
}
