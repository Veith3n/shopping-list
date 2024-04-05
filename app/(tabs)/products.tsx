import { useState } from 'react';
import { SectionList, StatusBar, StyleSheet } from 'react-native';

import { Product, ProductData, ProductSection, ProductSectionHeader } from '@/components/Product';
import { View } from '@/components/Themed';

const PRODUCT_LIST: ProductData[] = [
  { name: 'Pizza', price: 10, shopName: 'Pizza Hut' },
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
  const [productList, _setProductList] = useState<ProductData[]>(PRODUCT_LIST);

  const groupedData = productList.reduce((acc: ProductSection[], item: ProductData) => {
    const sectionExists = acc.find((section) => section.title === item.shopName);

    if (sectionExists) {
      sectionExists.data.push(item);
    } else {
      acc.push({ title: item.shopName, data: [item] });
    }

    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedData}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => Product({ item, styles: styles.item })}
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
