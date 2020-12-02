import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import Place from '../model/place';

// Utils
import { createHttpObservable } from 'src/app/core/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private weatherApiUrl: string =
    'http://api.openweathermap.org/data/2.5/weather';

  places: Place[] = [
    { name: 'Bratislava', todayForecast: 0 },
    { name: 'Humenné', todayForecast: 0 },
    { name: 'Koromľa', todayForecast: 0 },
    { name: 'Košice', todayForecast: 0 },
    { name: 'Michalovce', todayForecast: 0 },
    { name: 'Sobrance', todayForecast: 0 },
  ];

  constructor() {
    this.places.forEach((place) => {
      let place$: Observable<any> = this.getTodayForecast(place.name);
      place$.subscribe((obsPlace) => {
        if (obsPlace) {
          place.todayForecast = obsPlace.main && obsPlace.main.temp;
          place.lat = obsPlace.coord && obsPlace.coord.lat;
          place.lon = obsPlace.coord && obsPlace.coord.lon;
        }
      });
    });
  }

  public getPlaces(search = ''): Observable<Place[]> {
    return of(
      this.places.filter((place) =>
        place.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  public getTodayForecast(name: string): Observable<any> {
    return createHttpObservable(
      `${this.weatherApiUrl}?q=${encodeURI(
        name
      )}&appid=81ada4fdd34badf40c40a25238394138&units=metric&lang=sk`
    ).pipe(map((res) => res));
  }
}
