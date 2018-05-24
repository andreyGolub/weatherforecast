import { Component, OnInit } from '@angular/core';
import { CityWeatherService} from '../city-weather.service';

@Component({
  selector: 'app-current-info',
  templateUrl: './current-info.component.html',
  styleUrls: ['./current-info.component.css']
})
export class CurrentInfoComponent implements OnInit {
  

  constructor(public cityWeather: CityWeatherService) { }

  ngOnInit() {
  }

}
