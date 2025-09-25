import { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { ImageSourcePropType, Platform, View } from 'react-native';
import { Modal } from '.';
import pigs from '../../../docs/assets/pigs.png';
import { ViewWrap } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { BottomSheetModal } from '../BottomSheet';
import { Box } from '../Box';
import { Button } from '../Button';

const meta = {
  title: 'Stories / Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    noScroll: true,
  },
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text to be displayed.',
    },
    description: {
      control: 'text',
      description: 'The description text to be displayed.',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button.',
    },
    primaryButtonText: {
      control: 'text',
      description: 'Text for the primary button.',
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Text for the secondary button.',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the modal is in a loading state.',
    },
    onPressPrimaryButton: { action: () => null },
    onPressSecondaryButton: { action: () => null },
    onPressCloseButton: { action: () => null },
  },
  args: {
    heading: 'Modal Heading',
    description: 'This is a modal description',
    showCloseButton: true,
    primaryButtonText: 'Primary',
    secondaryButtonText: 'Cancel',
    loading: false,
    onPressCloseButton: () => null,
    onPressPrimaryButton: () => null,
    onPressSecondaryButton: () => null,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: [],
  },
  render: ({ ...args }) => {
    const modalRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
      modalRef.current?.present();
    };

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={openModal}>Open Modal</Button>

          <Modal ref={modalRef} {...args} />
        </ViewWrap>
      </View>
    );
  },
};

export const WithImage = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    modalRef.current?.present();
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <Button onPress={openModal}>Open Modal</Button>

        <Modal
          ref={modalRef}
          heading="Modal Heading"
          description="This is a modal description"
          onPressCloseButton={closeModal}
          primaryButtonText="Primary"
          onPressPrimaryButton={closeModal}
          secondaryButtonText="Cancel"
          onPressSecondaryButton={closeModal}
          index={1}
          image={{
            source: pigs as ImageSourcePropType,
            resizeMode: 'contain',
          }}
        />
      </ViewWrap>
    </View>
  );
};

export const WithCustomContent = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    modalRef.current?.present();
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <Button onPress={openModal}>Open Modal</Button>

        <Modal
          ref={modalRef}
          heading="Modal Heading"
          description="This is a modal description"
          onPressCloseButton={closeModal}
          primaryButtonText="Primary"
          onPressPrimaryButton={closeModal}
          secondaryButtonText="Cancel"
          onPressSecondaryButton={closeModal}
        >
          <Box gap="200">
            <BodyText>This is a modal with content.</BodyText>
            <BodyText>You can swipe it up and down to close.</BodyText>
          </Box>
        </Modal>
      </ViewWrap>
    </View>
  );
};

export const Loading = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
    modalRef.current?.present();
  };

  const closeModal = () => {
    modalRef.current?.dismiss();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <Button onPress={openModal}>Open Modal</Button>

        <Modal
          ref={modalRef}
          heading="Modal Heading"
          description="This is a modal description"
          onPressCloseButton={closeModal}
          primaryButtonText="Primary"
          onPressPrimaryButton={closeModal}
          secondaryButtonText="Cancel"
          onPressSecondaryButton={closeModal}
          loading
        >
          <Box gap="200">
            <BodyText>This is a modal with content.</BodyText>
            <BodyText>You can swipe it up and down to close.</BodyText>
          </Box>
        </Modal>
      </ViewWrap>
    </View>
  );
};
