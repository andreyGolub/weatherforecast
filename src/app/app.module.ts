import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartModule } from 'angular-highcharts';
import { AppComponent } from './app.component';
import { CityInputComponent } from './city-input/city-input.component';
import { CurrentInfoComponent } from './current-info/current-info.component';
import { WeatherChartsComponent } from './weather-charts/weather-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    CityInputComponent,
    CurrentInfoComponent,
    WeatherChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
