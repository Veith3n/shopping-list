import { StatusBar, StyleSheet } from 'react-native';

import { AddProductForm, AddProductFormValues } from '@/components/forms/AddProductForm';
import { View } from '@/components/Themed';
import useProductList from '@/hooks/useProductList';

export default function ProductsScreen() {
  const { addProduct } = useProductList();

  const handleAddProduct = (product: AddProductFormValues) => {
    addProduct(product);
  };

  return (
    <View style={styles.container}>
      <AddProductForm onAddProduct={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
});
