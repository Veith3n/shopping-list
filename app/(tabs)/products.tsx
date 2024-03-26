import { SectionList, StatusBar, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

interface Product {
  name: string;
  price: number;
  shopName: string;
}

const PRODUCT_LIST: Product[] = [
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

interface Section<T> {
  title: string;
  data: T[];
}

interface ProductSection extends Section<Product> {}

const renderProduct = ({ item }: { item: Product }) => (
  <View style={{ ...styles.item }}>
    <Text>
      {item.name} - ${item.price}
    </Text>
  </View>
);

const renderSectionHeader = ({ section }: { section: ProductSection }) => (
  <View style={{ ...styles.header }}>
    <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
  </View>
);

export default function ProductsScreen() {
  const groupedData = PRODUCT_LIST.reduce((acc: ProductSection[], item: Product) => {
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
        renderItem={({ item }) => renderProduct({ item })}
        renderSectionHeader={({ section }) => renderSectionHeader({ section })}
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
