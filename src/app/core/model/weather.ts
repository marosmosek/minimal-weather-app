import { Moment } from 'moment';
import Place from './place';

export interface WeatherCondition {
  main?: string;
  description?: string;
  icon?: string;
}
export interface Temperature {
  day?: number;
  min?: number;
  max?: number;
}
export interface dailyWeatherCondition {
  dt?: Moment;
  sunrise?: Moment;
  sunset?: Moment;
  temperature?: Temperature;
  pressure?: number;
  humidity?: number;
  wind?: number;
  weatherCondition?: WeatherCondition;
}
export default interface Weather {
  place?: Place;
  timeZone?: string;
  dailyForecast?: dailyWeatherCondition[];
}
