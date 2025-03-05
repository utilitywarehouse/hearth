import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@utilitywarehouse/hearth-react';

const sizes = ['lg', 'md', 'sm', 'xs'] as const;

const meta: Meta<typeof Spinner> = {
  title: 'Stories / Spinner',
  component: Spinner,
  argTypes: {
    size: { control: { type: 'radio' }, options: sizes },
  },
  args: {
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Workshop: Story = {};
