import { Component, OnInit, Input } from '@angular/core';
import { City} from '../city';
import { CityService} from '../city.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css']
})
export class CityInputComponent implements OnInit {
  city: City = {
    name: "",
    key: 0 
  };

  constructor(private cityService: CityService) { }

  setCity(): void {
    this.cityService.setCity(this.city);
    this.cityService.getInfo();
    console.log("Input works!");
  }

  ngOnInit() {
  }

}
