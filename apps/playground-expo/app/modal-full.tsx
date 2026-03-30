import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

import {
  BodyText,
  Box,
  Divider,
  Flex,
  NavModal,
  type NavModalRef,
} from '@utilitywarehouse/hearth-react-native';

export default function ModalScreen() {
  const modalRef = useRef<NavModalRef>(null);
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
    <NavModal
      ref={modalRef}
      presentation="fullScreenModal"
      heading="How statuses work"
      onPressCloseButton={handleClose}
    >
      <Flex spacing="lg">
        <BodyText weight="semibold" size="lg">
          What are appointment outcomes?
        </BodyText>
        <BodyText>
          You must provide an appointment outcome before booking a follow-up, with five different
          options available to cover all scenarios and record how the appointment went.
        </BodyText>
        <Divider />
        <BodyText weight="semibold" size="lg">
          What does each outcome mean?
        </BodyText>
        <Box>
          <BodyText weight="semibold">No show or cancellation</BodyText>
          <BodyText>The appointment didn't go ahead as planned</BodyText>
        </Box>
        <Box>
          <BodyText weight="semibold">I signed them up</BodyText>
          <BodyText>
            Does what it says on the tin, you will be asked to add what they signed up as; a
            customer, a Partner or both a customer and a Partner.
          </BodyText>
        </Box>
        <Box>
          <BodyText weight="semibold">They're interested, I'll follow up</BodyText>
          <BodyText>
            The appointment went well and they are considering signing up, but more work is needed.
            Maybe they need to speak to their current provider, or to check with someone in their
            household.
          </BodyText>
        </Box>
        <Box>
          <BodyText weight="semibold">No for now, maybe in the future</BodyText>
          <BodyText>
            They're not sure. It's not a definite no but they don't want to join just now. It's
            worth checking in with them in a few months to see if anything has changed.
          </BodyText>
        </Box>
        <Box>
          <BodyText weight="semibold">They're definitely not interested</BodyText>
          <BodyText>
            They don't want you to reach out to them again. Things can always change so it's worth
            archiving the profile, rather than deleting it.
          </BodyText>
        </Box>
        <Divider />
        <Box>
          <BodyText weight="semibold" size="lg">
            How do they help me?
          </BodyText>
          <BodyText>
            Each outcome drives a different experience in the app, influencing push messaging, the
            note added to the profile history, and the recommended profile status.
          </BodyText>
        </Box>
      </Flex>
    </NavModal>
  );
}
