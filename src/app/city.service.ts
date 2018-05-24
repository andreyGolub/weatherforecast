import { Injectable } from '@angular/core';
import { City } from './city';
import axios from 'Axios';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  city: City;

  constructor() { }

  setCity(city: City){
    this.city = city;
  }

  getInfo() {
    axios.get('http://dataservice.accuweather.com/locations/v1/cities/search',{
      params: {
        apikey: 'QmRlAlNdDeX1vJLuP2wosFcXUZrka8bc',
        q: this.city.name
      }
    })
    .then(async (response) =>{
      
      console.log(response.data[0].Key);
      let res = axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + response.data[0].Key, {
        params: {
          apikey: 'QmRlAlNdDeX1vJLuP2wosFcXUZrka8bc',
          details: 'true',
          metric: 'true'
        }
      })
      return res;
    })
    .then(async (response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    
  }
}
