import { Component, OnInit } from '@angular/core';
import { CityWeatherService} from '../city-weather.service';
import { Chart } from  'angular-highcharts';


@Component({
  selector: 'app-weather-charts',
  templateUrl: './weather-charts.component.html',
  styleUrls: ['./weather-charts.component.css']
})
export class WeatherChartsComponent implements OnInit {

  isInit = false;

  chart;

  constructor(public cityWeather: CityWeatherService) { }

  draw(){
    let data = [];
    for(let i = 0; i < this.cityWeather.weather.length; i ++){
      data.push(this.cityWeather.weather[i].TemperatureMax);
    }
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3]
        }
      ]
    });
  }

  ngOnInit() {
    this.cityWeather.change.subscribe( (isInit) => {
      this.isInit=isInit;
      this.draw();
    })
  }

}
