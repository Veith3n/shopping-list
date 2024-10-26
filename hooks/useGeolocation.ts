import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import { PermissionStatus } from 'expo-location';
import { useEffect, useState } from 'react';

const useGeolocation = () => {
  const [coords, setCoords] = useState<LocationObjectCoords | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const [isGeolocationAvailable, setIsGeolocationAvailable] = useState(true);
  const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(false);

  useEffect(() => {
    const checkLocationServices = async () => {
      const enabled = await Location.hasServicesEnabledAsync();
      setIsGeolocationEnabled(enabled);

      if (!enabled) {
        setErrorMsg('Location services are not enabled');
      }
    };

    checkLocationServices();
  }, []);

  useEffect(() => {
    const requestPermissionAndFetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== PermissionStatus.GRANTED) {
        setErrorMsg('Permission to access location was denied');
        setIsGeolocationAvailable(false);

        return;
      }

      try {
        const { coords } = await Location.getCurrentPositionAsync();
        setCoords(coords);
      } catch (error) {
        setErrorMsg('Unable to fetch location');

        console.error(error);
      }
    };

    if (isGeolocationEnabled) {
      requestPermissionAndFetchLocation();
    }
  }, [isGeolocationEnabled]);

  return { coords, errorMsg, isGeolocationAvailable, isGeolocationEnabled };
};

export default useGeolocation;
