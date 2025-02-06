import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '.';
import { coloursAsArray } from '../../utils';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Spinner',
  component: Spinner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: 'select',
      description: 'The size of the Spinner.',
    },
    color: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the Spinner. Use the color name from the theme.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const KitchenSink: Story = {
  render: args => (
    <Box gap="200">
      <VariantTitle title="XS">
        <Spinner {...args} size="xs" />
      </VariantTitle>
      <VariantTitle title="SM">
        <Spinner {...args} size="sm" />
      </VariantTitle>
      <VariantTitle title="MD">
        <Spinner {...args} size="md" />
      </VariantTitle>
      <VariantTitle title="LG">
        <Spinner {...args} size="lg" />
      </VariantTitle>
    </Box>
  ),
};
