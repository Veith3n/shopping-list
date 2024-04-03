import { View, ViewStyle } from 'react-native';

import { Section, SectionHeader } from './Section';
import { Text } from './Themed';

export interface ProductSection extends Section<ProductData> {}

export interface ProductData {
  name: string;
  price: number;
  shopName: string;
}

export const Product = ({ item, styles }: { item: ProductData; styles: ViewStyle }) => (
  <View style={{ ...styles }}>
    <Text>
      {item.name} - ${item.price}
    </Text>
  </View>
);

export const ProductSectionHeader = (section: ProductSection, styles: ViewStyle) => <SectionHeader<ProductData> section={section} styles={styles} />;
