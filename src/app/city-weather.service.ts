import { Injectable, Output, EventEmitter } from '@angular/core';
import { City } from './city';
import { Weather } from './weather';
import { CurrentWeather } from './current-weather';
import axios from 'Axios';
import { CLEAN_PROMISE } from '@angular/core/src/render3/instructions';


@Injectable({
  providedIn: 'root'
})
export class CityWeatherService {
  city: City;
  weather: Weather[];
  currentWeather: CurrentWeather;
  isInit = false;

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

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
      this.city.countryID = response.data[0].Country.ID;
      this.city.key = response.data[0].Key;
      let res = axios.get('http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/' + this.city.key,{
        params: {
          apikey: 'QmRlAlNdDeX1vJLuP2wosFcXUZrka8bc',
          details: 'true',
          metric: 'true'
        }
      });
      return res;
    })
    .then(async (response) => {
      console.log(response);
      let tmp = new CurrentWeather();
      tmp.date = response.data[0].DateTime;
      tmp.icon = response.data[0].WeatherIcon;
      tmp.iconPhrase = response.data[0].IconPhrase;
      tmp.temperature = response.data[0].Temperature.Value;
      tmp.realFeelTemperature = response.data[0].RealFeelTemperature.Value;
      tmp.wind = response.data[0].Wind.Speed.Value;
      tmp.humidity = response.data[0].RelativeHumidity;
      tmp.precipitationProbability = response.data[0].PrecipitationProbability;
      tmp.cloudCover = response.data[0].CloudCover;
      this.currentWeather = tmp;

      let res =axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + this.city.key,{
        params: {
          apikey: 'QmRlAlNdDeX1vJLuP2wosFcXUZrka8bc',
          details: 'true',
          metric: 'true'
        }
      });
      return res;
    }).then(async (response) =>{
      this.weather = new Array<Weather>();
      for (let i = 0; i < response.data.DailyForecasts.length; i++) {
        let tempWeather = new Weather();

        tempWeather.date = response.data.DailyForecasts[i].Date;
        tempWeather.dayCloudCover = response.data.DailyForecasts[i].Day.CloudCover;
        tempWeather.dayRainProbability = response.data.DailyForecasts[i].Day.RainProbability;
        tempWeather.dayIcon = response.data.DailyForecasts[i].Day.Icon;
        tempWeather.dayIconPhrase = response.data.DailyForecasts[i].Day.IconPhrase;
        tempWeather.dayPhrase = response.data.DailyForecasts[i].Day.LongPhrase;
        tempWeather.dayWindSpeed = response.data.DailyForecasts[i].Day.Wind.Speed.Value;
        tempWeather.HoursOfSun = response.data.DailyForecasts[i].HoursOfSun;
        tempWeather.moonRise = response.data.DailyForecasts[i].Moon.Rise;
        tempWeather.moonSet = response.data.DailyForecasts[i].Moon.Set;
        tempWeather.nightCloudCover = response.data.DailyForecasts[i].Night.CloudCover;
        tempWeather.nightRainProbability = response.data.DailyForecasts[i].Night.RainProbability;
        tempWeather.nightIcon = response.data.DailyForecasts[i].Night.Icon;
        tempWeather.nightIconPhrase = response.data.DailyForecasts[i].Night.IconPhrase;
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
      console.log(response.data);
      this.isInit = true;
      this.change.emit(this.isInit);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
