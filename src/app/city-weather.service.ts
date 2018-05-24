import { Injectable } from '@angular/core';
import { City } from './city';
import { Weather } from './weather';
import axios from 'Axios';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  city: City;
  weather: Weather[];

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
      let res = axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + response.data[0].Key,{
        params: {
          apikey: 'QmRlAlNdDeX1vJLuP2wosFcXUZrka8bc',
          details: 'true',
          metric: 'true'
        }
      })
      return res;
    })
    .then(async (response) => {
      this.weather = new Array<Weather>();
      for (let i = 0; i < response.data.DailyForecasts.length; i++) {
        let tempWeather = new Weather();

        tempWeather.date = response.data.DailyForecasts[i].Date;
        tempWeather.dayCloudCover = response.data.DailyForecasts[i].Day.CloudCover;
        tempWeather.dayRainProbability = response.data.DailyForecasts[i].Day.RainProbability;
        tempWeather.dayIcon = response.data.DailyForecasts[i].Day.Icon;
        tempWeather.dayPhrase = response.data.DailyForecasts[i].Day.LongPhrase;
        tempWeather.dayWindSpeed = response.data.DailyForecasts[i].Day.Wind.Speed.Value;
        tempWeather.HoursOfSun = response.data.DailyForecasts[i].HoursOfSun;
        tempWeather.moonRise = response.data.DailyForecasts[i].Moon.Rise;
        tempWeather.moonSet = response.data.DailyForecasts[i].Moon.Set;
        tempWeather.nightCloudCover = response.data.DailyForecasts[i].Night.CloudCover;
        tempWeather.nightRainProbability = response.data.DailyForecasts[i].Night.RainProbability;
        tempWeather.nightIcon = response.data.DailyForecasts[i].Night.Icon;
        tempWeather.nightPhrase = response.data.DailyForecasts[i].Night.LongPhrase;
        tempWeather.nightWindSpeed = response.data.DailyForecasts[i].Night.Wind.Speed.Value;
        tempWeather.realFeelTempMax = response.data.DailyForecasts[i].RealFeelTemperature.Maximum.Value;
        tempWeather.realFeelTempMin = response.data.DailyForecasts[i].RealFeelTemperature.Minimum.Value;
        tempWeather.sunRise = response.data.DailyForecasts[i].Sun.Rise;
        tempWeather.sunSet = response.data.DailyForecasts[i].Sun.Set;
        tempWeather.TemperatureMax = response.data.DailyForecasts[i].Temperature.Maximum.Value;
        tempWeather.TemperatureMin = response.data.DailyForecasts[i].Temperature.Minimum.Value;

        this.weather.push(tempWeather);
      }
      //console.log(response.data);
      console.log(this.weather);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
