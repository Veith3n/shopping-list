import React from 'react';
import { Button, StyleSheet } from 'react-native';

import { ProductData } from './Product';
import { Text, View } from './Themed';

interface ProductDetailsProps {
  product: ProductData;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.detail}>Id: {product.id}</Text>
      <Text style={styles.detail}>Price: ${product.price}</Text>
      <Text style={styles.detail}>Shop: {product.shopName}</Text>
      <Text style={styles.detail}>Purchased: {product.purchased ? 'Yes' : 'No'}</Text>
      <Text style={styles.detail}>Details: {product.details ? product.details : '-'}</Text>

      <Button title="Close" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ProductDetails;
