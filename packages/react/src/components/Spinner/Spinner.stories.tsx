import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Spinner } from './Spinner';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const colors = ['primary', 'secondary', 'brand', 'inverted'] as const;

const meta: Meta<typeof Spinner> = {
  title: 'Components / Spinner',
  component: Spinner,
  argTypes: {
    size: { control: { type: 'radio' }, options: sizes },
    color: { options: colors, control: { type: 'select' } },
    currentColor: { control: { type: 'boolean' } },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  tags: ['!test'],
};

export const KitchenSink: Story = {
  tags: ['!test'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex gap="600">
      {sizes.map(size => (
        <Spinner key={size} size={size} />
      ))}
    </Flex>
  ),
};
