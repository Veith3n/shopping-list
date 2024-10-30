import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import OpenMeteoApiService, { ValueUnit, WeatherApiCurrentWeatherResponseWithWeatherInfo } from '@/common/api/open-meteo-api.service';
import wmoIcons from '@/common/wmo-icons';
import { Text, useThemeColor, View } from '@/components/Themed';
import { Cities, cityCoordinates } from '@/constants/Cities';
import useGeolocation from '@/hooks/useGeolocation';

const CURRENT_LOCATION = 'CURRENT_LOCATION';
type CitiesWithCurrentLocation = Cities | typeof CURRENT_LOCATION;

export default function WeatherInfo() {
  const { coords: currentCoords, errorMsg: geolocationError } = useGeolocation();

  const [selectedLocation, setSelectedLocation] = useState<CitiesWithCurrentLocation>(CURRENT_LOCATION);
  const [weather, setWeather] = useState<WeatherApiCurrentWeatherResponseWithWeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const predefinedLocations: { label: string; value: CitiesWithCurrentLocation }[] = [
    { label: 'Current Location', value: CURRENT_LOCATION },
    { label: 'Tokyo', value: Cities.TOKYO },
    { label: 'Warsaw', value: Cities.WARSAW },
    { label: 'New York', value: Cities.NEW_YORK },
  ];

  const openMeteoApiService = OpenMeteoApiService.getInstance();

  const resolveCityCords = (city: CitiesWithCurrentLocation) => {
    return city === 'CURRENT_LOCATION' ? currentCoords : cityCoordinates[city];
  };

  useEffect(() => {
    const getWeather = async () => {
      const coords = resolveCityCords(selectedLocation);

      if (coords) {
        setLoading(true);
        try {
          const weatherData = await openMeteoApiService.getCurrentWeatherData(coords.latitude, coords.longitude);

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
  }, [selectedLocation, currentCoords]);

  return (
    <View style={styles.container}>
      <CitySelectionPicker locations={predefinedLocations} setSelectedLocation={setSelectedLocation} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weatherError ? (
        <Text style={styles.errorText}>{weatherError}</Text>
      ) : weather ? (
        <WeatherInformation weather={weather} />
      ) : (
        <Text style={styles.errorText}>{geolocationError}</Text>
      )}
    </View>
  );
}

const CitySelectionPicker = ({
  locations,
  setSelectedLocation,
}: {
  locations: { label: string; value: CitiesWithCurrentLocation }[];
  setSelectedLocation: (value: CitiesWithCurrentLocation) => void;
}) => {
  const color = useThemeColor('text');

  return (
    <RNPickerSelect
      onValueChange={(value) => setSelectedLocation(value)}
      items={locations}
      style={{ inputAndroid: { ...pickerSelectStyles.inputAndroid, color }, inputIOS: { ...pickerSelectStyles.inputIOS, color } }}
      placeholder={{ label: 'Select a location', value: null }}
    />
  );
};

const WeatherInformation = ({ weather }: { weather: WeatherApiCurrentWeatherResponseWithWeatherInfo }) => (
  <View style={styles.weatherContainer}>
    <Text style={styles.title}>Weather Information</Text>
    <WeatherIconWithText weatherCode={weather.currentWeatherInfo.weatherInfo.value} />
    <WeatherUnitInfo valueUnit={weather.currentWeatherInfo.temperature} prefix="Temperature:" />
    <WeatherUnitInfo valueUnit={weather.currentWeatherInfo.wind} prefix="Windspeed:" />
    <WeatherUnitInfo valueUnit={weather.currentWeatherInfo.windDirection} prefix="Wind Direction:" />
  </View>
);

const WeatherUnitInfo = ({ prefix, valueUnit: { value, unit } }: { prefix: string; valueUnit: ValueUnit }) => (
  <Text style={styles.weatherText}>
    {prefix} {value} {unit}
  </Text>
);

const WeatherIconWithText = ({ weatherCode }: { weatherCode: number }) => {
  const iconName = wmoIcons[weatherCode];

  if (!iconName) {
    return null;
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
