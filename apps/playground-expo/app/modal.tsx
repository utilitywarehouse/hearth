import { Link, router, useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Modal } from '@utilitywarehouse/hearth-react-native';

export default function ModalScreen() {
  const modalRef = useRef<any>(null);
  const navigation = useNavigation();
  const isClosingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    // Trigger our custom animation first
    modalRef.current?.triggerCloseAnimation?.();

    // Delay the actual navigation to allow our animation to play
    setTimeout(() => {
      router.back();
    }, 100); // Match animation duration
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!isClosingRef.current) {
        // Prevent default behavior
        e.preventDefault();
        handleClose();
      }
    });

    return unsubscribe;
  }, [navigation, handleClose]);

  return (
    <Modal
      ref={modalRef}
      fullscreen
      onPressCloseButton={handleClose}
      primaryButtonText="Action"
      onPressPrimaryButton={handleClose}
      secondaryButtonText="Cancel"
      onPressSecondaryButton={handleClose}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">This is a modal</ThemedText>
        <Link href="/" dismissTo style={styles.link}>
          <ThemedText type="link">Go to home screen</ThemedText>
        </Link>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
