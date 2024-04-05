import { Button, StyleSheet, View, ViewStyle } from 'react-native';

import { Section, SectionHeader } from './Section';
import { Text } from './Themed';

export interface ProductSection extends Section<ProductData> {}

export interface ProductData {
  name: string;
  price: number;
  shopName: string;
  purchased?: boolean;
}

export function compareProducts(productOne: ProductData, productTwo: ProductData): boolean {
  return (
    productOne.name === productTwo.name &&
    productOne.price === productTwo.price &&
    productOne.shopName === productTwo.shopName &&
    productOne.purchased === productTwo.purchased
  );
}

export const ProductSectionHeader = (section: ProductSection, styles: ViewStyle) => <SectionHeader<ProductData> section={section} styles={styles} />;

export const Product = ({
  item,
  styles,
  onRemoval,
  onMarkAsPurchased,
}: {
  item: ProductData;
  styles: ViewStyle;
  onRemoval: (product: ProductData) => void;
  onMarkAsPurchased: (product: ProductData) => void;
}) => (
  <View style={{ ...styles }}>
    <Text style={item.purchased && localStyles.strikethrough}>
      {item.name} - ${item.price}
    </Text>

    <View style={localStyles.buttonsContainer}>
      <Button title="Mark as purchased" onPress={() => onMarkAsPurchased(item)} disabled={item.purchased} />

      <View style={{ marginLeft: 8 }}>
        <Button title="Remove" color="red" onPress={() => onRemoval(item)} />
      </View>
    </View>
  </View>
);

const localStyles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
  },
});
