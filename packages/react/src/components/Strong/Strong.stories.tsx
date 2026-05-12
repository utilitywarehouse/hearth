import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText, Flex, Strong } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Strong> = {
  title: 'Typography / Strong',
  component: Strong,
};

export default meta;
type Story = StoryObj<typeof Strong>;

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex direction="column" gap="100">
      {sizes.map(size => (
        <BodyText key={size} size={size}>
          The most important thing to remember is, <Strong>stay positive</Strong>.
        </BodyText>
      ))}
    </Flex>
  ),
};
