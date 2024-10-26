import { renderHook, waitFor } from '@testing-library/react';
import * as Location from 'expo-location';
import { LocationObject, PermissionResponse, PermissionStatus } from 'expo-location';

import useGeolocation from './useGeolocation';

describe(useGeolocation.name, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when location services are disabled', () => {
    beforeEach(() => jest.spyOn(Location, 'hasServicesEnabledAsync').mockResolvedValue(false));

    it('should set error message if location services are not enabled', async () => {
      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        expect(result.current.isGeolocationEnabled).toBe(false);
        expect(result.current.errorMsg).toBe('Location services are not enabled');
      });
    });
  });

  describe('when location services are enabled', () => {
    beforeEach(() => jest.spyOn(Location, 'hasServicesEnabledAsync').mockResolvedValue(true));

    it('should set error message if permission is denied', async () => {
      jest.spyOn(Location, 'requestForegroundPermissionsAsync').mockResolvedValue({ status: PermissionStatus.DENIED } as PermissionResponse);

      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        expect(result.current.isGeolocationAvailable).toBe(false);
        expect(result.current.errorMsg).toBe('Permission to access location was denied');
      });
    });

    it('should set coordinates if permission is granted and location is fetched successfully', async () => {
      const mockCoords = { latitude: 37.7749, longitude: -122.4194 };

      jest.spyOn(Location, 'requestForegroundPermissionsAsync').mockResolvedValue({ status: PermissionStatus.GRANTED } as PermissionResponse);
      jest.spyOn(Location, 'getCurrentPositionAsync').mockResolvedValue({ coords: mockCoords } as LocationObject);

      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        expect(result.current.coords).toEqual(mockCoords);
        expect(result.current.errorMsg).toBeUndefined();
      });
    });

    it('should set error message if unable to fetch location and permissions are granted', async () => {
      jest.spyOn(Location, 'requestForegroundPermissionsAsync').mockResolvedValue({ status: PermissionStatus.GRANTED } as PermissionResponse);

      jest.spyOn(Location, 'getCurrentPositionAsync').mockRejectedValue(new Error('Unable to fetch location'));

      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        expect(result.current.errorMsg).toBe('Unable to fetch location');
      });
    });
  });
});
