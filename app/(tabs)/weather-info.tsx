import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import OpenMeteoApiService, { ValueUnit, WeatherApiCurrentWeatherResponseWithWeatherInfo } from '@/common/api/open-meteo-api.service';
import wmoIcons from '@/common/wmo-icons';
import { Text, useThemeColor, View } from '@/components/Themed';
import useGeolocation from '@/hooks/useGeolocation';

export default function WeatherInfo() {
  const { coords, errorMsg } = useGeolocation();

  const [weather, setWeather] = useState<WeatherApiCurrentWeatherResponseWithWeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const openMeteoApiService = OpenMeteoApiService.getInstance();

  useEffect(() => {
    const getWeather = async () => {
      if (coords) {
        try {
          const weatherData = await openMeteoApiService.getCurrentWeatherData(coords.latitude, coords.longitude);
          console.log(weatherData);

          if (weatherData.success) {
            setWeather(weatherData);
          } else {
            setWeatherError('Failed to fetch weather data');
          }
        } catch (error) {
          setWeatherError('Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      }
    };

    getWeather();
  }, [coords]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weatherError ? (
        <Text style={styles.errorText}>{weatherError}</Text>
      ) : weather ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.title}>Current location weather</Text>
          <WeatherIconWithText weathercode={weather.current_weather.weathercode} />
          <WeatherUnitInfo valueUnit={weather.currentWeatherInfo.temperature} prefix="Temperature:" />
          <WeatherUnitInfo valueUnit={weather.currentWeatherInfo.wind} prefix="Windspeed:" />
          <WeatherUnitInfo valueUnit={weather.currentWeatherInfo.windDirection} prefix="Wind Direction:" />
        </View>
      ) : (
        <Text style={styles.errorText}>{errorMsg}</Text>
      )}
    </View>
  );
}

const WeatherUnitInfo = ({ prefix, valueUnit: { value, unit } }: { prefix: string; valueUnit: ValueUnit }) => (
  <Text style={styles.weatherText}>
    {prefix} {value} {unit}
  </Text>
);

const WeatherIconWithText = ({ weathercode }: { weathercode: number }) => {
  const iconName = wmoIcons[weathercode];

  if (!iconName) {
    return <></>;
  }

  const color = useThemeColor('text');

  return (
    <View style={styles.iconContainer}>
      <Text style={styles.weatherText}>Weather: </Text>
      <MaterialCommunityIcons name={iconName} size={48} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherText: {
    fontSize: 18,
    marginVertical: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginVertical: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});
