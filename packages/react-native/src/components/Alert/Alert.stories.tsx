import { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['info', 'positive', 'warning', 'danger'],
      description: 'Use this value to change the alert type and colour scheme.',
      defaultValue: 'info',
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
    colorScheme: 'info',
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
          colorScheme="info"
          text="Unlock the power of knowledge with the following information."
        />
      </VariantTitle>
      <VariantTitle title="Success - positive">
        <Alert
          colorScheme="positive"
          text="Boom! You did it! Please take a moment to pat yourself on the back. You've earned it!"
        />
      </VariantTitle>
      <VariantTitle title="Error - Red">
        <Alert
          colorScheme="danger"
          text="Uh-oh! It looks like the matrix has glitched. Our team of tech ninjas are already on the
          case. Please hold tight while we fix the issue"
        />
      </VariantTitle>
      <VariantTitle title="Warning - warning">
        <Alert
          colorScheme="warning"
          text="Warning: Reading the following content may cause spontaneous outbursts of 'aha!' moments"
        />
      </VariantTitle>
    </Flex>
  ),
};
