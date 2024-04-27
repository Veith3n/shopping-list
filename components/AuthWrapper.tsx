import { Redirect } from 'expo-router';
import React from 'react';
import { Button } from 'react-native';

import { useSession } from '@/app/ctx';
import { Text } from '@/components/Themed';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isLoading, session, signOut } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      {children}
      <Button title="Logout" onPress={signOut} color="red" />
    </>
  );
};

export default AuthWrapper;
