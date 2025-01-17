import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import Toast from 'react-native-toast-message';

import AuthWrapper from '@/components/AuthWrapper';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { ProductProvider } from '@/contexts/ProductContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthWrapper>
      <ProductProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
          }}
        >
          <Tabs.Screen
            name="add-product"
            options={{
              title: 'Add product',
              tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: 'Products shopping list',
              tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="geolocation"
            options={{
              title: 'Geolocation',
              tabBarIcon: ({ color }) => <MaterialIcons name="my-location" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="weather-info"
            options={{
              title: 'Weather Info',
              tabBarIcon: ({ color }) => <Feather name="cloud" size={24} color={color} />,
            }}
          />
        </Tabs>
        <Toast />
      </ProductProvider>
    </AuthWrapper>
  );
}
