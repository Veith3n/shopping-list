import { useContext } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { AddProductForm, AddProductFormValues } from '@/components/forms/AddProductForm';
import { View } from '@/components/Themed';
import { ProductContext } from '@/contexts/ProductContext';

export default function ProductsScreen() {
  const { addProduct } = useContext(ProductContext);

  const handleAddProduct = (product: AddProductFormValues) => {
    addProduct(product);
    showAddProductToast();
  };

  const showAddProductToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Product Added',
      text2: 'The product has been added successfully.',
      visibilityTime: 2000,
      autoHide: true,
    });
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
