import { View, TextInput, TextInputProps } from 'react-native';
import { Text } from '../Text';
import { styles } from './styles';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  label?: string;
}

export function Input({ value, onChangeText, error, label, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="caption" tone="secondary" style={{ marginBottom: 4 }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#999"
        {...rest}
      />
      {error ? (
        <Text variant="caption" tone="danger" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
