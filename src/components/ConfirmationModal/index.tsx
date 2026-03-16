import { Modal, Pressable, View } from 'react-native';
import { Text, Button } from '@/src/design-system/components';
import { styles } from './styles';

export interface ConfirmationModalProps {
  visible: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  visible,
  message,
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
          <Text variant="body" style={styles.message}>
            {message}
          </Text>
          <View style={styles.actions}>
            <Button variant="secondary" label={cancelLabel} onPress={onCancel} />
            <Button variant="primary" label={confirmLabel} onPress={onConfirm} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
