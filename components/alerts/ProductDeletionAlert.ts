import { Alert } from 'react-native';

export const DeleteProductAlert = ({ productName, onDelete }: { productName: string; onDelete: () => void }): void => {
  Alert.alert(
    'Delete Product',
    `Are you sure you want to delete ${productName}?`,
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ],
    { cancelable: false },
  );
};
