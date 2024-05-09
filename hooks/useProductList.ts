import { useState } from 'react';

import { AddProductFormValues } from '@/components/forms/AddProductForm';
import { ProductData } from '@/components/Product';

const PRODUCT_LIST: ProductData[] = [
  {
    id: 1,
    name: 'SuperLongPizzaName SuperLongPizzaNameSuperLongPizzaNameSuperLongPizzaNameSuperLongPizzaNameSuperLongPizzaName',
    price: 10,
    shopName: 'Pizza Hut',
    details: 'Tasty pizza with pepperoni, mushrooms, and extra cheese',
  },
  { id: 2, name: 'Burger', price: 5, shopName: 'McDonalds', details: 'Tasty burger' },
  { id: 3, name: 'Risotto', price: 15, shopName: 'Olive Garden' },
  { id: 4, name: 'French Fries', price: 2, shopName: 'McDonalds' },
  { id: 5, name: 'Onion Rings', price: 3, shopName: 'Burger King' },
  { id: 6, name: 'Fried Shrimps', price: 8, shopName: 'Red Lobster' },
  { id: 7, name: 'Water', price: 1, shopName: 'Publix' },
  { id: 8, name: 'Coke', price: 2, shopName: 'Publix' },
  { id: 10, name: 'Beer', price: 5, shopName: 'Publix' },
  { id: 12, name: 'Cheese Cake', price: 4, shopName: 'Cheesecake Factory' },
  { id: 22, name: 'Ice Cream', price: 3, shopName: 'Cold Stone' },
];

const useProductList = () => {
  const [productList, setProductList] = useState<ProductData[]>(PRODUCT_LIST);

  const addProduct = (product: AddProductFormValues) => {
    const nextId = Math.max(...productList.map((product) => product.id)) + 1;

    setProductList((prevList) => [{ id: nextId, ...product }, ...prevList]);
  };

  const deleteProduct = (productId: number) => {
    setProductList((prevList) => prevList.filter((product) => product.id !== productId));
  };

  const updateProduct = (updatedProduct: ProductData) => {
    setProductList((prevList) => prevList.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
  };

  return { productList, addProduct, deleteProduct, updateProduct };
};

export default useProductList;
