import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText, Em, Flex } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Em> = {
  title: 'Stories / Em',
  component: Em,
};

export default meta;
type Story = StoryObj<typeof Em>;

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex direction="column" gap="100">
      {sizes.map(size => (
        <BodyText key={size} size={size}>
          We <Em>had</Em> to do something about it.
        </BodyText>
      ))}
    </Flex>
  ),
};
