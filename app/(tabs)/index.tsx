import { useContext, useState } from 'react';
import { SectionList, StatusBar, StyleSheet } from 'react-native';

import { DeleteProductAlert } from '@/components/alerts/ProductDeletionAlert';
import { Product, ProductData, ProductSection, ProductSectionHeader } from '@/components/Product';
import { TextInput, View } from '@/components/Themed';
import { ProductContext } from '@/contexts/ProductContext';

export default function ProductsScreen() {
  const { productList, deleteProduct, updateProduct } = useContext(ProductContext);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [shopFilter, setShopFilter] = useState<string | null>(null);

  const groupedData = productList
    .filter((product) => priceFilter === null || product.price.toString().includes(priceFilter.toString()))
    .filter((product) => shopFilter === null || product.shopName.toLowerCase().includes(shopFilter.toLowerCase()))
    .reduce((acc: ProductSection[], item: ProductData) => {
      const sectionExists = acc.find((section) => section.title === item.shopName);

      if (sectionExists) {
        sectionExists.data.push(item);
      } else {
        acc.push({ title: item.shopName, data: [item] });
      }

      return acc;
    }, []);

  const handleDeleteProduct = (productToDelete: ProductData) => {
    const handleDeleteProduct = () => {
      deleteProduct(productToDelete.id);
    };

    DeleteProductAlert({ productName: productToDelete.name, onDelete: handleDeleteProduct });
  };

  const handleMarkAsPurchased = (productToMark: ProductData) => {
    updateProduct({ ...productToMark, purchased: true });
  };

  const handlePriceFilterChange = (price: string) => {
    const parsedPrice = parseInt(price);

    const numericPrice = Number.isNaN(parsedPrice) ? null : parsedPrice;

    setPriceFilter(numericPrice);
  };

  const handleShopFilterChange = (shop: string) => {
    setShopFilter(shop);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterItem}>
          <TextInput
            style={styles.filterInput}
            placeholder="Filter by price"
            keyboardType="numeric"
            onChangeText={handlePriceFilterChange}
            value={priceFilter ? priceFilter.toString() : ''}
          />
        </View>
        <View style={styles.filterItem}>
          <TextInput style={styles.filterInput} placeholder="Filter by shop" onChangeText={handleShopFilterChange} value={shopFilter ?? ''} />
        </View>
      </View>

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
  filterContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});
