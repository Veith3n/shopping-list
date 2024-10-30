type wmoCode = string;

export interface OpenMeteoApiService {
  getCurrentWeatherData(): Promise<GetCurrentWeatherDataResponse>;
}

export type GetCurrentWeatherDataResponse = WeatherApiCurrentWeatherResponse | FailedResponse;

export interface FailedResponse {
  reason: string;
  error: true;
}

export interface WeatherApiBaseResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
}

export interface WeatherApiCurrentWeatherResponse extends WeatherApiBaseResponse {
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
}

export interface CurrentWeatherUnits {
  time: string;
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: wmoCode;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
}
