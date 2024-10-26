import { LocationObjectCoords } from 'expo-location';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import useGeolocation from '@/hooks/useGeolocation';

import { Text, View } from './Themed';

const GeolocationComponent: React.FC = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geolocation Info</Text>
      {!isGeolocationAvailable ? (
        <GeolocationError message="Your device does not support Geolocation" />
      ) : !isGeolocationEnabled ? (
        <GeolocationError message="Geolocation is not enabled" />
      ) : coords ? (
        <GeolocationTable coords={coords} />
      ) : (
        <GeolocationLoading />
      )}
    </View>
  );
};

const GeolocationError: React.FC<{ message: string }> = ({ message }) => <Text style={styles.errorText}>{message}</Text>;

const GeolocationTableEntry: React.FC<{ label: string; value: number | null }> = ({ label, value }) => {
  const prepValueToDisplay = (value: number | null) => value?.toFixed(2) ?? 'N/A';

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{label}</Text>
      <Text style={styles.tableCell}>{prepValueToDisplay(value)}</Text>
    </View>
  );
};

const GeolocationTable: React.FC<{ coords: LocationObjectCoords }> = ({ coords }) => (
  <View style={styles.table}>
    <GeolocationTableEntry label="Latitude" value={coords.latitude} />
    <GeolocationTableEntry label="Longitude" value={coords.longitude} />
    <GeolocationTableEntry label="Altitude" value={coords.altitude} />
    <GeolocationTableEntry label="Heading" value={coords.heading} />
    <GeolocationTableEntry label="Speed" value={coords.speed} />
  </View>
);

const GeolocationLoading: React.FC = () => (
  <View style={styles.loadingBox}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Getting the location data…</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tableCell: {
    fontSize: 18,
  },
  loadingBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default GeolocationComponent;
