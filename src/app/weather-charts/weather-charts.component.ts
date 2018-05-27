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
  chartMaxTemp;
  chartMinTemp;
  chartDayProb;
  chartNightProb;
  chartDayWind;
  chartNightWind;
  chartSunMoonRise;
  chartSunMoonSet;
  chartHoursOfSunChart;

  constructor(public cityWeather: CityWeatherService) { }

  draw() {
    let maxTempArr = [];
    let maxFeelArr = [];
    let minTempArr = [];
    let minFeelArr = [];
    let dayProbArr = [];
    let nightProbArr = [];
    let dayWindArrr = [];
    let nightWindArr = [];
    let sunRiseArr = [];
    let sunSetArr = [];
    let moonRiseArr = [];
    let moonSetArr = [];
    let hoursOfSunArr = [];
    let dateArr = [];
    for (let i = 0; i < this.cityWeather.weather.length; i++) {
      maxTempArr.push(this.cityWeather.weather[i].TemperatureMax);
      maxFeelArr.push(this.cityWeather.weather[i].realFeelTempMax);
      minTempArr.push(this.cityWeather.weather[i].TemperatureMin);
      minFeelArr.push(this.cityWeather.weather[i].realFeelTempMin);
      dayProbArr.push(this.cityWeather.weather[i].dayRainProbability);
      nightProbArr.push(this.cityWeather.weather[i].nightRainProbability);
      dayWindArrr.push(this.cityWeather.weather[i].dayWindSpeed);
      nightWindArr.push(this.cityWeather.weather[i].nightWindSpeed);
      sunRiseArr.push((+this.cityWeather.weather[i].sunRise.substr(11, 2)) + (+this.cityWeather.weather[i].sunRise.substr(14, 2) / 100));
      sunSetArr.push((+this.cityWeather.weather[i].sunSet.substr(11, 2)) + (+this.cityWeather.weather[i].sunSet.substr(14, 2) / 100));
      moonRiseArr.push((+this.cityWeather.weather[i].moonRise.substr(11, 2)) + (+this.cityWeather.weather[i].moonRise.substr(14, 2) / 100));
      moonSetArr.push((+this.cityWeather.weather[i].moonSet.substr(11, 2)) + (+this.cityWeather.weather[i].moonSet.substr(14, 2) / 100));
      hoursOfSunArr.push(this.cityWeather.weather[i].HoursOfSun);
      dateArr.push(this.cityWeather.weather[i].date.substr(0, 10));
    }

    this.chartMaxTemp = this.createDoubleBar(maxTempArr, maxFeelArr, dateArr, "Day maximum temperature", "Day max temperature", "Real feel temperature", '°C');
    this.chartMinTemp = this.createDoubleBar(minTempArr, minFeelArr, dateArr, "Day minimum temperature", "Day min temperature", "Real feel temperature", '°C');
    this.chartDayProb = this.createBar(dayProbArr, dateArr, "Day precipitation probability", '%');
    this.chartNightProb = this.createBar(nightProbArr, dateArr, "Night precipitation probability", '%');
    this.chartDayWind = this.createSpline(dayWindArrr, dateArr, "Day wind speed", 'km/h');
    this.chartNightWind = this.createSpline(nightProbArr, dateArr, "Night wind speed", 'km/h');
    this.chartSunMoonRise = this.createDoubleBar(sunRiseArr, moonRiseArr, dateArr, "Sun/moon rise time", "Sun rise time", "Moon rise time", '');
    this.chartSunMoonSet = this.createDoubleBar(sunSetArr, moonSetArr, dateArr, "Sun/moon set time", "Sun set time", "Moon set time", '');
    this.chartHoursOfSunChart = this.createLine(hoursOfSunArr, dateArr, "Hours of sun", "");
  }


  createLine(data : number[], categories : string[], text : string, metric : string){
    return new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: text
      },
      xAxis: {
        categories: categories
      },
      tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y + metric;
        }
    },
      series: [
        {
          name: text + ' ' + metric,
          data: data,
          color: '#9040D5	'
        }
      ]
    });
  }

  createSpline(data : number[], categories : string[], text : string, metric : string){
    return new Chart({
      chart: {
        type: 'spline'
      },
      title: {
        text: text
      },
      xAxis: {
        categories: categories
      },
      tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y + metric;
        }
    },
      series: [
        {
          name: text + ' ' + metric,
          data: data,
          color: '#9040D5	'
        }
      ]
    });
  }
  
  createBar(data : number[], categories : string[], text : string, metric : string){
    return new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: text
      },
      xAxis: {
        categories: categories
      },
      tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y + metric;
        }
    },
      series: [
        {
          name: text + ' ' + metric,
          data: data,
          color: '#9040D5	'
        }
      ]
    });
  }

  createDoubleBar( firstData : number[], secondData : number[], categories : string[], text : string, firstSeriesName : string, secondSeriesName : string, metric : string){
    return new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: text
      },
      xAxis: {
        categories: categories
      },
      tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.x + ': ' + this.y + metric;
        }
      },
      series: [
        {
          name: firstSeriesName + ' ' + metric,
          data: firstData,
          color: '#FFD740'
        },{
          name: secondSeriesName + ' ' + metric,
          data: secondData,
          color: '#5E4BD8'
        }
      ]
    });
  }
  
  ngOnInit() {
    this.cityWeather.change.subscribe((isInit) => {
      this.isInit = isInit;
      this.draw();
    })
  }
}

