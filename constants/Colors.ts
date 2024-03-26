import { ColorSchemeName } from 'react-native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Colors: Record<'light' | 'dark', ColorList> = {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;

export interface ColorList {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export function getColorSchemeForScheme(colorScheme: ColorSchemeName): ColorList {
  return Colors[colorScheme ?? 'light'];
}
