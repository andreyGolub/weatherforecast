import { Component, OnInit } from '@angular/core';
import { CityWeatherService} from '../city-weather.service';

@Component({
  selector: 'app-weather-charts',
  templateUrl: './weather-charts.component.html',
  styleUrls: ['./weather-charts.component.css']
})
export class WeatherChartsComponent implements OnInit {

  isInit = false;

  constructor(public cityWeather: CityWeatherService) { }

  draw(){
    
  }

  ngOnInit() {
    this.cityWeather.change.subscribe( (isInit) => {
      this.isInit=isInit;
      this.draw();
    })
  }

}
