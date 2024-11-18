import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Components / Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: { type: 'text' } },
    nested: { control: { type: 'boolean' } },
    disableUserSelect: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Pollen Label',
    nested: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Workshop: Story = {};
