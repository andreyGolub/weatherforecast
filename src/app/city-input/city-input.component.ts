import { Component, OnInit, Input } from '@angular/core';
import { City} from '../city';
import { CityWeatherService} from '../city-weather.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {
  city: City = {
    name: "",
    countryID: "",
    key: 0
  };

  constructor(private cityWeatherService: CityWeatherService) { }

  setCity(): void {
    this.cityWeatherService.setCity(this.city);
    this.cityWeatherService.getInfo();
    console.log("Input works!");
  }

  ngOnInit() {
  }

}
