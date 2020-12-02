import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { DashboardTopbarComponent } from './components/dashboard-topbar/dashboard-topbar.component';
import { OpenWeatherApiService } from '../core/services/open-weather-api.service';
import { PlacesService } from '../core/services/places.service';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchComponent,
    WeatherWidgetComponent,
    DashboardTopbarComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [OpenWeatherApiService, PlacesService],
})
export class DashboardModule {}
