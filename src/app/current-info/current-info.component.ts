import { Component, OnInit, HostBinding } from '@angular/core';
import { CityWeatherService} from '../city-weather.service';
import { CurrentWeather } from '../current-weather'; 

@Component({
  selector: 'app-current-info',
  templateUrl: './current-info.component.html',
  styleUrls: ['./current-info.component.css']
})
export class CurrentInfoComponent implements OnInit {
  
  isInit = false;
  date;
  constructor(public cityWeather: CityWeatherService) { }

  ngOnInit() {
    this.cityWeather.change.subscribe((isInit) => {
      this.isInit = isInit;
      this.date = this.cityWeather.currentWeather.date.substr(0, 10)
    })
  }
}
