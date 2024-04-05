import { Button, View, ViewStyle } from 'react-native';

import { Section, SectionHeader } from './Section';
import { Text } from './Themed';

export interface ProductSection extends Section<ProductData> {}

export interface ProductData {
  name: string;
  price: number;
  shopName: string;
}

export function compareProducts(productOne: ProductData, productTwo: ProductData): boolean {
  return productOne.name === productTwo.name && productOne.price === productTwo.price && productOne.shopName === productTwo.shopName;
}

export const Product = ({ item, styles, onRemoval }: { item: ProductData; styles: ViewStyle; onRemoval: (product: ProductData) => void }) => (
  <View style={{ ...styles }}>
    <Text>
      {item.name} - ${item.price}
    </Text>
    <Button title="Remove" color="red" onPress={() => onRemoval(item)} />
  </View>
);

export const ProductSectionHeader = (section: ProductSection, styles: ViewStyle) => <SectionHeader<ProductData> section={section} styles={styles} />;
