import { View, ViewStyle } from 'react-native';

import { useThemeColor } from './Themed';
import { Text } from './Themed';

export interface Section<T> {
  title: string;
  data: T[];
}

export const SectionHeader = <T,>({ section, styles }: { section: Section<T>; styles: ViewStyle }) => {
  const backgroundColor = useThemeColor('secondaryBackground');
  const textColor = useThemeColor('secondaryText');

  return (
    <View style={{ backgroundColor: backgroundColor, ...styles }}>
      <Text style={{ fontWeight: 'bold', color: textColor }}>{section.title}</Text>
    </View>
  );
};
