import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { ProductData } from '../Product';
import { Text, TextInput, View } from '../Themed';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  price: Yup.number().typeError('Price must be a number').positive('Price must be a positive number').required('Product price is required'),
  shopName: Yup.string().required('Shop name is required'),
  details: Yup.string().optional(),
});

interface AddProductFormProps {
  onAddProduct: (product: AddProductFormValues) => void;
}

export interface AddProductFormValues extends Omit<ProductData, 'id'> {}

export const AddProductForm = ({ onAddProduct }: AddProductFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      shopName: '',
      price: 0,
      details: '',
    },
  });

  const onSubmit = ({ name, shopName, price, details }: AddProductFormValues) => {
    onAddProduct({ name: name.trim(), shopName: shopName.trim(), price, details: details?.trim() });
    reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter product name"
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Price:</Text>
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            value={value.toString()}
            onChangeText={(text) => {
              const parsedValue = parseInt(text);

              if (Number.isNaN(parsedValue)) {
                onChange('');
              } else {
                onChange(parsedValue);
              }
            }}
            placeholder="Enter product price"
            keyboardType="numeric"
          />
        )}
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      <Text style={styles.label}>Shop Name:</Text>
      <Controller
        control={control}
        name="shopName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.shopName && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Enter shop name"
          />
        )}
      />
      {errors.shopName && <Text style={styles.error}>{errors.shopName.message}</Text>}

      <Text style={styles.label}>Details:</Text>
      <Controller
        control={control}
        name="details"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.details && styles.inputError]}
            value={value}
            onChangeText={onChange}
            placeholder="Optional product details"
          />
        )}
      />
      {errors.details && <Text style={styles.error}>{errors.details.message}</Text>}

      <Button title="Add Product" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});
