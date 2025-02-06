import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: 'text' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: 'Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Blue: Story = {
  args: {
    colorScheme: 'blue',
  },
};

export const KitchenSink: Story = {
  render: () => (
    <Box gap="200">
      <VariantTitle title="Blue">
        <Badge colorScheme="blue">Blue badge</Badge>
      </VariantTitle>
      <VariantTitle title="Green">
        <Badge colorScheme="green">Green badge</Badge>
      </VariantTitle>
      <VariantTitle title="Red">
        <Badge colorScheme="red">Red badge</Badge>
      </VariantTitle>
      <VariantTitle title="Orange">
        <Badge colorScheme="orange">Orange badge</Badge>
      </VariantTitle>
      <VariantTitle title="Grey">
        <Badge colorScheme="grey">Grey badge</Badge>
      </VariantTitle>
    </Box>
  ),
};
