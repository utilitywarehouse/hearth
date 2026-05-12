import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Flex } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Avatar> = {
  title: 'Components / Avatar',
  component: Avatar,
  argTypes: {
    size: { control: { type: 'radio' }, options: ['sm', 'md'] },
    name: { control: { type: 'text' } },
    src: { control: { type: 'text' } },
  },
  args: {
    name: undefined,
    src: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

// Kitchen sink covers all variations so we don't need a Gallery story
export const KitchenSink: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    return (
      <Flex direction="row" gap="400">
        <Flex direction="row" gap="200">
          <Avatar size="md" />
          <Avatar size="sm" />
        </Flex>
        <Flex direction="row" gap="200">
          <Avatar size="md" name="Rob Phoenix" />
          <Avatar size="sm" name="Rob Phoenix" />
        </Flex>
        <Flex direction="row" gap="200">
          <Avatar
            size="md"
            src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
            name="Rob Phoenix"
          />
          <Avatar
            size="sm"
            src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
            name="Rob Phoenix"
          />
        </Flex>
      </Flex>
    );
  },
};

export const ResponsiveSize: Story = {
  render: () => {
    return (
      <Flex direction="row" gap="200" alignItems="center">
        <Avatar
          size={{ mobile: 'sm', desktop: 'md' }}
          src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
          name="Rob Phoenix"
        />
        <Avatar size={{ mobile: 'sm', desktop: 'md' }} name="Rob Phoenix" />
        <Avatar size={{ mobile: 'sm', desktop: 'md' }} />
      </Flex>
    );
  },
};
