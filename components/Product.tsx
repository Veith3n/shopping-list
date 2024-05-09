import { useState } from 'react';
import { Button, Modal, StyleSheet, ViewStyle } from 'react-native';

import ProductDetails from './ProductDetails';
import { Section, SectionHeader } from './Section';
import { Text, View } from './Themed';

export interface ProductSection extends Section<ProductData> {}

export interface ProductData {
  id: number;
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
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  return (
    <>
      <View style={[localStyles.container, { ...styles }]}>
        <Modal visible={showDetails} transparent animationType="slide" onRequestClose={handleCloseDetails}>
          <View style={localStyles.modalContainer}>
            <View style={localStyles.modalContent}>
              <ProductDetails product={item} onClose={handleCloseDetails} />
            </View>
          </View>
        </Modal>

        <View style={localStyles.textContainer}>
          <Text style={item.purchased && localStyles.strikethrough} numberOfLines={5} onPress={handleShowDetails}>
            {item.name} - ${item.price}
          </Text>
        </View>
        <View style={localStyles.buttonsContainer}>
          <Button title="Mark as purchased" onPress={() => onMarkAsPurchased(item)} disabled={item.purchased} />

          <View style={{ marginLeft: 8 }}>
            <Button title="Remove" color="red" onPress={() => onRemoval(item)} />
          </View>
        </View>
      </View>
    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
});
