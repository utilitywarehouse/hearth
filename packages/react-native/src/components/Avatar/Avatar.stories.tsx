import { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: 'radio',
      description: 'Size of the avatar.',
    },
    name: {
      control: 'text',
      description: 'Name used for initials and accessibility.',
    },
    src: {
      control: 'object',
      description: 'Image source object (e.g. { uri: "..." }).',
    },
    delayMs: {
      control: 'number',
      description: 'Delay in ms before showing the fallback.',
    },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    name: 'Jane Doe',
    src: { uri: 'https://ca.slack-edge.com/T0HR00WDA-U05SHRATW7Q-3ad4ae7c75b8-512' },
  },
};

export const Icon: Story = {};

export const Initials: Story = {
  args: {
    name: 'Jane Doe',
  },
};

export const Image: Story = {
  args: {
    name: 'Jane Doe',
    src: { uri: 'https://ca.slack-edge.com/T0HR00WDA-U05SHRATW7Q-3ad4ae7c75b8-512' },
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="row" spacing="xl" align="center">
      <Flex direction="column" spacing="md" align="center">
        <VariantTitle title="SM">
          <Avatar size="sm" name="Jane Doe" />
        </VariantTitle>
      </Flex>
      <Flex direction="column" spacing="md" align="center">
        <VariantTitle title="MD">
          <Avatar size="md" name="Jane Doe" />
        </VariantTitle>
      </Flex>
    </Flex>
  ),
};
