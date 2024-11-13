import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box } from './Box';
import * as React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components / Box',
  component: Box,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: { type: 'text' } },
    padding: { control: { type: 'text' } },
  },
  args: {
    children: 'CSS Box',
    padding: { mobile: '4px', tablet: '8px', desktop: '16px' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workshop: Story = {
  render: args => <Box {...args} />,
};
