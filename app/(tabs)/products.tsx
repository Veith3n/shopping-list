import { useState } from 'react';
import { Button, SectionList, StatusBar, StyleSheet } from 'react-native';

import { DeleteProductAlert } from '@/components/alerts/ProductDeletionAlert';
import { AddProductForm } from '@/components/forms/AddProductForm';
import { compareProducts, Product, ProductData, ProductSection, ProductSectionHeader } from '@/components/Product';
import { View } from '@/components/Themed';

const PRODUCT_LIST: ProductData[] = [
  {
    name: 'SuperLongPizzaName SuperLongPizzaNameSuperLongPizzaNameSuperLongPizzaNameSuperLongPizzaNameSuperLongPizzaName',
    price: 10,
    shopName: 'Pizza Hut',
  },
  { name: 'Burger', price: 5, shopName: 'McDonalds' },
  { name: 'Risotto', price: 15, shopName: 'Olive Garden' },
  { name: 'French Fries', price: 2, shopName: 'McDonalds' },
  { name: 'Onion Rings', price: 3, shopName: 'Burger King' },
  { name: 'Fried Shrimps', price: 8, shopName: 'Red Lobster' },
  { name: 'Water', price: 1, shopName: 'Publix' },
  { name: 'Coke', price: 2, shopName: 'Publix' },
  { name: 'Beer', price: 5, shopName: 'Publix' },
  { name: 'Cheese Cake', price: 4, shopName: 'Cheesecake Factory' },
  { name: 'Ice Cream', price: 3, shopName: 'Cold Stone' },
];

export default function ProductsScreen() {
  const [productList, setProductList] = useState<ProductData[]>(PRODUCT_LIST);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const groupedData = productList.reduce((acc: ProductSection[], item: ProductData) => {
    const sectionExists = acc.find((section) => section.title === item.shopName);

    if (sectionExists) {
      sectionExists.data.push(item);
    } else {
      acc.push({ title: item.shopName, data: [item] });
    }

    return acc;
  }, []);

  const addProduct = () => {
    setShowAddProductForm(true);
  };

  const handleAddProduct = (product: ProductData) => {
    setProductList([product, ...productList].map((product) => ({ ...product })));

    setShowAddProductForm(false);
  };

  const handleDeleteProduct = (productToDelete: ProductData) => {
    const handleDeleteProduct = () => {
      setProductList((prevList) => {
        const indexToRemove = prevList.findIndex((product) => compareProducts(product, productToDelete));

        if (indexToRemove === -1) {
          return prevList;
        }

        return [...prevList.slice(0, indexToRemove), ...prevList.slice(indexToRemove + 1)];
      });
    };

    DeleteProductAlert({ productName: productToDelete.name, onDelete: handleDeleteProduct });
  };

  const handleMarkAsPurchased = (productToMark: ProductData) => {
    setProductList((prevList) => {
      const indexToMark = prevList.findIndex((product) => compareProducts(product, productToMark));

      if (indexToMark === -1) {
        return prevList;
      }

      const updatedProduct = { ...prevList[indexToMark] };
      updatedProduct.purchased = true;

      return [...prevList.slice(0, indexToMark), updatedProduct, ...prevList.slice(indexToMark + 1)];
    });
  };

  return (
    <View style={styles.container}>
      {!showAddProductForm && <Button title="Add Product" onPress={addProduct} />}
      {showAddProductForm && <AddProductForm onAddProduct={handleAddProduct} />}

      <SectionList
        sections={groupedData}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => Product({ item, styles: styles.item, onRemoval: handleDeleteProduct, onMarkAsPurchased: handleMarkAsPurchased })}
        renderSectionHeader={({ section }) => ProductSectionHeader(section, styles.header)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    padding: 10,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
});
