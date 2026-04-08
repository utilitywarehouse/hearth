import { Meta, StoryObj } from '@storybook/react-native';
import { useRef } from 'react';
import { ImageSourcePropType, Platform, View } from 'react-native';
import { Modal, ModalImage } from '.';
import pigs from '../../../docs/assets/pigs.png';
import { ViewWrap } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { BottomSheetModal, BottomSheetModalProvider } from '../BottomSheet';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';

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
    loadingHeading: {
      control: 'text',
      description: 'The heading text to be displayed when loading is true.',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Whether the modal should take up the full screen height.',
    },
  },
  actions: {
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
    fullscreen: false,
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
          image={<ModalImage source={pigs as ImageSourcePropType} resizeMode="contain" />}
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

export const StickyCustomFooter = () => {
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
          heading="Update billing details"
          description="Review the changes below, then save or discard them using a custom sticky footer."
          onPressCloseButton={closeModal}
          footer={
            <Flex direction="row" spacing="md" pt="250">
              <Button
                variant="outline"
                colorScheme="functional"
                onPress={closeModal}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button onPress={closeModal} style={{ flex: 1 }}>
                Save changes
              </Button>
            </Flex>
          }
          footerStyle={{
            boxShadow: '0px -6px 12px rgba(16, 24, 40, 0.12)',
          }}
        >
          <Box gap="200">
            <BodyText>Billing address: 14 Park Street, Bristol</BodyText>
            <BodyText>Preferred payment day: 15th of each month</BodyText>
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

export const FullscreenModal: Story = {
  render: () => {
    const modalRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
      modalRef.current?.present();
    };

    const closeModal = () => {
      modalRef.current?.dismiss();
    };

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 800 } : { flex: 1 }}>
        <ViewWrap>
          <Button onPress={openModal}>Open Fullscreen Modal</Button>

          <Modal
            ref={modalRef}
            heading="Fullscreen Modal Heading"
            description="This is a fullscreen modal description"
            onPressCloseButton={closeModal}
            primaryButtonText="Primary"
            onPressPrimaryButton={closeModal}
            secondaryButtonText="Cancel"
            onPressSecondaryButton={closeModal}
            fullscreen
          >
            <Box gap="200">
              <BodyText>This is a fullscreen modal with content.</BodyText>
              <BodyText>You can swipe it up and down to close.</BodyText>
            </Box>
          </Modal>
        </ViewWrap>
      </View>
    );
  },
};

export const NoStickyFooter: Story = {
  render: () => {
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
            description="This is a modal description without a sticky footer."
            onPressCloseButton={closeModal}
            primaryButtonText="Primary"
            onPressPrimaryButton={closeModal}
            secondaryButtonText="Cancel"
            onPressSecondaryButton={closeModal}
            stickyFooter={false}
          >
            <Box gap="200">
              <BodyText>This is a modal with content.</BodyText>
              <BodyText>You can swipe it up and down to close.</BodyText>
            </Box>
          </Modal>
        </ViewWrap>
      </View>
    );
  },
};

export const NoFooter: Story = {
  render: () => {
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
            description="This is a modal description without a footer."
            onPressCloseButton={closeModal}
          >
            <Box gap="200">
              <BodyText>This is a modal with content.</BodyText>
              <BodyText>You can swipe it up and down to close.</BodyText>
            </Box>
          </Modal>
        </ViewWrap>
      </View>
    );
  },
};

export const NoSafeArea: Story = {
  render: () => {
    const modalRef = useRef<BottomSheetModal>(null);

    const openModal = () => {
      modalRef.current?.present();
    };

    const closeModal = () => {
      modalRef.current?.dismiss();
    };

    return (
      <BottomSheetModalProvider useSafeAreaInsets={false}>
        <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
          <ViewWrap>
            <Button onPress={openModal}>Open Modal</Button>

            <Modal
              ref={modalRef}
              heading="Modal Heading"
              description="This is a modal description without safe area insets."
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
      </BottomSheetModalProvider>
    );
  },
};
