import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Flex } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Avatar> = {
  title: 'Stories / Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Use `Avatar` help humanise the product experience by connecting users with the product and to each other.',
      },
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const KitchenSink: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <Flex direction="row" gap="200" alignItems="center">
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
        <Flex direction="row" gap="200" alignItems="center">
          <Avatar size="md" />
          <Avatar size="sm" />
        </Flex>
        <Flex direction="row" gap="200" alignItems="center">
          <Avatar size="md" name="Agnes Martin" />
          <Avatar size="sm" name="Agnes Martin" />
        </Flex>
      </Flex>
    );
  },
};
