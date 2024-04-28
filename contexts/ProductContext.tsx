import React, { createContext } from 'react';

import { AddProductFormValues } from '@/components/forms/AddProductForm';
import { ProductData } from '@/components/Product';
import useProductList from '@/hooks/useProductList';

interface ProductContextProps {
  productList: ProductData[];
  addProduct: (product: AddProductFormValues) => void;
  deleteProduct: (productId: number) => void;
  updateProduct: (updateProduct: ProductData) => void;
}

export const ProductContext = createContext<ProductContextProps>({
  productList: [],
  addProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
});

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const { productList, addProduct, deleteProduct, updateProduct } = useProductList();

  return <ProductContext.Provider value={{ productList, addProduct, deleteProduct, updateProduct }}>{children}</ProductContext.Provider>;
};
