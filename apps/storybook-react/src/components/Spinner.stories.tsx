import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, Spinner } from '@utilitywarehouse/hearth-react';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const colors = ['primary', 'secondary', 'brand', 'inverted'] as const;

const meta: Meta<typeof Spinner> = {
  title: 'Stories / Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Using a Spinner is a common method for indicating that an asynchronous process is ongoing.',
      },
    },
  },
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

export const Playground: Story = {};

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex gap="600">
      {sizes.map(size => (
        <Spinner key={size} size={size} />
      ))}
    </Flex>
  ),
};
