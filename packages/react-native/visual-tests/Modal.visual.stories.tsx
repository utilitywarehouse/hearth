import type { Meta, StoryObj } from '@storybook/react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { BottomSheetModalProvider } from '../src/components/BottomSheet';
import type { BottomSheetModal } from '../src/components/BottomSheet';
import { Modal } from '../src/components/Modal';

const meta = {
  title: 'Visual Tests/Modal',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const OpenModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  // `Modal` has no `open` prop: `present()` on mount is the supported way.
  useEffect(() => {
    modalRef.current?.present();
  }, []);

  return (
    <Modal
      ref={modalRef}
      heading="Modal heading"
      description="A short description of the modal."
      primaryButtonText="Primary"
      onPressPrimaryButton={noop}
      secondaryButtonText="Cancel"
      onPressSecondaryButton={noop}
      onPressCloseButton={noop}
      animationConfigs={{ duration: 0 }}
      onChange={noop}
    >
      <BodyText>Some fixed modal content.</BodyText>
    </Modal>
  );
};

export const Open: Story = {
  // Opened through the portal, so allow it to settle before the capture.
  parameters: { chromatic: { disableSnapshot: false, delay: 500 } },
  render: () => (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <OpenModal />
      </View>
    </BottomSheetModalProvider>
  ),
};
