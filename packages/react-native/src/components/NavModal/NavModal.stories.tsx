import { Meta, StoryObj } from '@storybook/react-native';
import { Platform, View } from 'react-native';
import { BodyText } from '../BodyText';
import { Box } from '../Box';
import NavModal from './NavModal';

const meta = {
  title: 'Stories / NavModal',
  component: NavModal,
  parameters: {
    layout: 'fullscreen',
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
    background: {
      control: 'radio',
      options: ['default', 'brand'],
      description: 'Sets the modal background.',
    },
    presentation: {
      control: 'radio',
      options: [
        'modal',
        'fullScreenModal',
        'transparentModal',
        'containedModal',
        'containedTransparentModal',
      ],
      description: 'Matches the React Navigation presentation style for the screen.',
    },
    scrollable: {
      control: 'boolean',
      description: 'Whether the modal content should be wrapped in a ScrollView.',
    },
  },
  actions: {
    onPressPrimaryButton: { action: () => null },
    onPressSecondaryButton: { action: () => null },
    onPressCloseButton: { action: () => null },
  },
  args: {
    heading: 'NavModal Heading',
    description: 'This is a navigation modal description',
    showCloseButton: true,
    primaryButtonText: 'Primary',
    secondaryButtonText: 'Cancel',
    loading: false,
    background: 'default',
    scrollable: true,
    presentation: 'modal',
    onPressCloseButton: () => null,
    onPressPrimaryButton: () => null,
    onPressSecondaryButton: () => null,
  },
} satisfies Meta<typeof NavModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: StoryObj<typeof meta.args>) => (
    <View style={Platform.OS === 'web' ? { width: 400, height: 720 } : { flex: 1 }}>
      <NavModal {...args}>
        <Box gap="200">
          <BodyText>This is a navigation modal with content.</BodyText>
          <BodyText>Use it for React Navigation modal screens instead of bottom sheets.</BodyText>
        </Box>
      </NavModal>
    </View>
  ),
};

export const BrandBackground: Story = {
  args: {
    background: 'brand',
  },
  render: (args: StoryObj<typeof meta.args>) => (
    <View style={Platform.OS === 'web' ? { width: 400, height: 720 } : { flex: 1 }}>
      <NavModal {...args}>
        <Box gap="200">
          <BodyText inverted>Brand background content stays readable with inverted text.</BodyText>
          <BodyText inverted>Buttons and the close icon also invert automatically.</BodyText>
        </Box>
      </NavModal>
    </View>
  ),
};

export const FullScreenPresentation: Story = {
  args: {
    presentation: 'fullScreenModal',
  },
  render: (args: StoryObj<typeof meta.args>) => (
    <View style={Platform.OS === 'web' ? { width: 400, height: 720 } : { flex: 1 }}>
      <NavModal {...args}>
        <Box gap="200">
          <BodyText>This uses the full-screen navigation modal presentation.</BodyText>
          <BodyText>The content switches away from the sheet-style card treatment.</BodyText>
        </Box>
      </NavModal>
    </View>
  ),
};
