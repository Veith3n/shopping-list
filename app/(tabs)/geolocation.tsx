import React from 'react';
import { StyleSheet, View } from 'react-native';

import GeolocationComponent from '@/components/GeolocationComponent';

export default function WeatherInfo() {
  return (
    <View style={styles.container}>
      <GeolocationComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
