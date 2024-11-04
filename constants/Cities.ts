type Coordinates = { latitude: number; longitude: number };

export enum Cities {
  TOKYO = 'Tokyo',
  WARSAW = 'Warsaw',
  NEW_YORK = 'New York',
}

export const cityCoordinates: { [key in Cities]: Coordinates } = {
  [Cities.TOKYO]: { latitude: 35.682839, longitude: 139.759455 },
  [Cities.WARSAW]: { latitude: 52.229676, longitude: 21.012229 },
  [Cities.NEW_YORK]: { latitude: 40.712776, longitude: -74.005974 },
};
