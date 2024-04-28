import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import AuthWrapper from '@/components/AuthWrapper';
import { Text } from '@/components/Themed';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

import { useSession } from '../ctx';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const { session } = useSession();

  const colorScheme = useColorScheme();

  return (
    <AuthWrapper>
      <Text>Session for: {session}</Text>
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
      </Tabs>
    </AuthWrapper>
  );
}
