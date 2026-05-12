import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { Em } from './Em';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Em> = {
  title: 'Typography / Em',
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
