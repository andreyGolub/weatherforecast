import { Component, OnInit } from '@angular/core';
import { CityWeatherService} from '../city-weather.service';
import { CurrentWeather } from '../current-weather'; 

@Component({
  selector: 'app-current-info',
  templateUrl: './current-info.component.html',
  styleUrls: ['./current-info.component.css']
})
export class CurrentInfoComponent implements OnInit {
  currentWeather: CurrentWeather = {
    date: "",
    icon: 0,
    iconPhrase: "",
    temperature: 0,
    realFeelTemperature: 0,
    wind: 0,
    humidity: 0,
    precipitationProbability: 0,
    cloudCover: 0
  }
  

  constructor(public cityWeather: CityWeatherService) { }

  getCurrentWeather(){
    this.currentWeather = this.cityWeather.currentWeather;
  }

  ngOnInit() {
    //this.getCurrentWeather();
  }

}
