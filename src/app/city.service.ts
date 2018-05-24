import { Injectable } from '@angular/core';
import { City } from './city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  city: City;
  
  constructor() { }

  setCity(city: City){
    this.city = city;
  }
}
