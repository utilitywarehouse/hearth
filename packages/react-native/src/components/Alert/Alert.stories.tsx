import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Alert } from './';
import { Text } from '../Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'React Native / Components / Alert',
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    text: { control: 'text' },
    title: { control: 'text' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    text: 'This is an alert',
    title: 'Alert',
    onClose: () => {},
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => <Text>Hello</Text>,
};

export const Cyan: Story = {
  args: {
    colorScheme: 'cyan',
  },
};
export const Green: Story = {
  args: {
    colorScheme: 'green',
  },
};
export const Gold: Story = {
  args: {
    colorScheme: 'gold',
  },
};
export const Red: Story = {
  args: {
    colorScheme: 'red',
  },
};
