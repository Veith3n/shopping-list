import { ColorSchemeName } from 'react-native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Colors: Record<'light' | 'dark', ColorList> = {
  light: {
    text: '#000',
    background: '#fff',
    secondaryBackground: '#f0f0f0',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    secondaryText: '#333333',
  },
  dark: {
    text: '#fff',
    secondaryText: '#333333',
    background: '#000',
    secondaryBackground: '#f0f0f0',
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
  secondaryBackground: string;
  secondaryText: string;
}

export function getColorSchemeForScheme(colorScheme: ColorSchemeName): ColorList {
  return Colors[colorScheme ?? 'light'];
}
