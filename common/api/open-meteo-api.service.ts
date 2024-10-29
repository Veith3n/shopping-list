import axios from 'axios';

import { FailedResponse, WeatherApiCurrentWeatherResponse } from './open-meteo-api.types';

export interface ValueUnit {
  value: number;
  unit: string;
}

export interface WeatherApiCurrentWeatherResponseWithWeatherInfo extends WeatherApiCurrentWeatherResponse {
  success: true;
  currentWeatherInfo: { temperature: ValueUnit; wind: ValueUnit; windDirection: ValueUnit };
}

interface FailedResponseWithInfo extends FailedResponse {
  success: false;
}

class OpenMeteoApiService implements OpenMeteoApiService {
  static readonly BASE_URL = 'https://api.open-meteo.com/v1';

  private static instance: OpenMeteoApiService;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  public static getInstance(): OpenMeteoApiService {
    if (!OpenMeteoApiService.instance) {
      OpenMeteoApiService.instance = new OpenMeteoApiService();
    }

    return OpenMeteoApiService.instance;
  }

  public getCurrentWeatherData(
    latitude: number,
    longitude: number,
  ): Promise<WeatherApiCurrentWeatherResponseWithWeatherInfo | FailedResponseWithInfo> {
    return axios
      .get<WeatherApiCurrentWeatherResponse>(`${this.baseUrl()}/forecast`, { params: { latitude, longitude, current_weather: true } })
      .then((response) => this.handleSuccessfulResponse(response.data))
      .catch((error) => {
        const baseErrorResponse: FailedResponse = error.response.data;

        return {
          ...baseErrorResponse,
          success: false,
        };
      });
  }

  private handleSuccessfulResponse(response: WeatherApiCurrentWeatherResponse): WeatherApiCurrentWeatherResponseWithWeatherInfo {
    const { current_weather, current_weather_units } = response;

    const weatherData = {
      time: current_weather.time,
      temperature: {
        value: current_weather.temperature,
        unit: current_weather_units.temperature,
      },
      wind: {
        value: current_weather.windspeed,
        unit: current_weather_units.windspeed,
      },
      windDirection: {
        value: current_weather.winddirection,
        unit: current_weather_units.winddirection,
      },
    };

    return { ...response, currentWeatherInfo: weatherData, success: true };
  }

  private baseUrl(): string {
    return OpenMeteoApiService.BASE_URL;
  }
}

export default OpenMeteoApiService;
