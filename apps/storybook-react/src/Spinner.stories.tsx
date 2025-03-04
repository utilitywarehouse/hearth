import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof Spinner> = {
  title: 'Stories / Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Workshop: Story = {};
