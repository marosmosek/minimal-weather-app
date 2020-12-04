import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Models
import Place from '../core/model/place';
import Weather from '../core/model/weather';

// Services
import { OpenWeatherApiService } from '../core/services/open-weather-api.service';
import { PlacesService } from '../core/services/places.service';

// Libraries
import _ from 'lodash';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import * as moment from 'moment';
import { Moment } from 'moment';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('600ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(400, style({ opacity: 0 }))),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  searchingDialog: boolean = false;
  weather$: Observable<Weather>;
  defaultPlace: Place = {
    name: 'Košice',
    todayForecast: 0,
    lat: 48.67,
    lon: 21.33,
  };

  constructor(
    private el: ElementRef,
    private openWeatherApi: OpenWeatherApiService
  ) {}

  ngOnInit(): void {
    this.weather$ = this.openWeatherApi.getWeatherForecast(this.defaultPlace);
  }

  public toggleSearchingDialog(): void {
    this.searchingDialog = !this.searchingDialog;

    this.el.nativeElement.closest('body').style.overflow = this.searchingDialog
      ? 'hidden'
      : 'auto';
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  public changeLocation(place: Place): void {
    this.weather$ = this.openWeatherApi.getWeatherForecast(place);
    this.toggleSearchingDialog();
  }

  public getDayTime(from: Moment, to: Moment): moment.Moment {
    if (from && to) {
      return moment.unix(from.unix() - to.unix());
    } else {
      return undefined;
    }
  }
}
