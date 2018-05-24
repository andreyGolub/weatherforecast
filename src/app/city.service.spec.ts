import { TestBed, inject } from '@angular/core/testing';

import { CityWeatherService } from './city-weather.service';

describe('CityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityWeatherService]
    });
  });

  it('should be created', inject([CityWeatherService], (service: CityWeatherService) => {
    expect(service).toBeTruthy();
  }));
});
