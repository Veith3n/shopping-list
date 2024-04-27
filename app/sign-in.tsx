import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import { TextInput, View } from '@/components/Themed';

import { useSession } from './ctx';

export default function SignIn() {
  const [email, setEmail] = useState('');

  const { signIn } = useSession();

  const handleSignIn = () => {
    if (!email) return;

    signIn(email);

    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />

      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
