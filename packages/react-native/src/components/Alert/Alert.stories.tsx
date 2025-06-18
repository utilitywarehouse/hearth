import { Alert } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { VariantTitle } from '../../../docs/components';

const meta = {
  title: 'Stories / Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'red'],
      description: 'Use this value to change the alert type and colour scheme.',
      defaultValue: 'blue',
    },
    title: {
      control: 'text',
      description: 'Use this value to set the alert title.',
    },
    text: {
      control: 'text',
      description: 'Use this value to set the alert text.',
    },
    link: {
      control: 'text',
      description:
        'Use this value to set the alert link text. Use along with the `onPressLink` prop.',
    },
    onClose: {
      control: 'boolean',
      description: 'Use this handle the on close event. (Use a function to handle the event.)',
    },
    onPressIconButton: {
      control: 'boolean',
      description: 'Use this handle Icon Button press. (Use a function to handle the event.)',
    },
  },
  args: {
    colorScheme: 'blue',
    title: 'Information',
    text: 'Unlock the power of knowledge with the following information.',
    link: 'Learn more',
    onPress: () => alert('Alert pressed'),
    onClose: () => alert('Alert closed'),
    onPressIconButton: () => alert('Icon button pressed'),
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Flex space="sm">
      <VariantTitle title="Info - Blue">
        <Alert
          colorScheme="blue"
          text="Unlock the power of knowledge with the following information."
        />
      </VariantTitle>
      <VariantTitle title="Success - Green">
        <Alert
          colorScheme="green"
          text="Boom! You did it! Please take a moment to pat yourself on the back. You've earned it!"
        />
      </VariantTitle>
      <VariantTitle title="Error - Red">
        <Alert
          colorScheme="red"
          text="Uh-oh! It looks like the matrix has glitched. Our team of tech ninjas are already on the
          case. Please hold tight while we fix the issue"
        />
      </VariantTitle>
      <VariantTitle title="Warning - Orange">
        <Alert
          colorScheme="orange"
          text="Warning: Reading the following content may cause spontaneous outbursts of 'aha!' moments"
        />
      </VariantTitle>
    </Flex>
  ),
};
