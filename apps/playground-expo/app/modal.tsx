import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { BodyText, Heading, InlineLink, Modal } from '@utilitywarehouse/hearth-react-native';

export default function ModalScreen() {
  const modalRef = useRef<Modal>(null);
  const navigation = useNavigation();
  const isClosingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (Platform.OS === 'ios') {
      navigation.goBack();
      return;
    }
    if (isClosingRef.current) return;

    isClosingRef.current = true;
    // Trigger our custom animation first
    modalRef.current?.triggerCloseAnimation?.();

    // Delay the actual navigation to allow our animation to play
    setTimeout(() => {
      navigation.goBack();
    }, 100); // Match Modal animation duration
  }, [navigation]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        if (!isClosingRef.current) {
          // Prevent default behavior
          e.preventDefault();
          handleClose();
        }
      });

      return unsubscribe;
    }
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
      <View style={styles.container}>
        <Heading size="xl">This is a modal</Heading>
        <BodyText>
          <InlineLink onPress={handleClose} style={styles.link}>
            Go to home screen
          </InlineLink>
        </BodyText>
      </View>
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
