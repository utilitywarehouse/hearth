import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { Strong } from './Strong';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Strong> = {
  title: 'Typography / Strong',
  component: Strong,
};

export default meta;
type Story = StoryObj<typeof Strong>;

/** Visual matrix of Strong across BodyText sizes — used in docs and Chromatic snapshot testing. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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
