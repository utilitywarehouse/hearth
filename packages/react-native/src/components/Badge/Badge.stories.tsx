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
    variant: {
      options: ['solid', 'outline'],
      control: 'radio',
      description: 'Variant of the badge.',
    },
    colorScheme: {
      options: ['blue', 'green', 'red', 'orange', 'grey'],
      control: 'select',
      description: 'Color scheme of the badge.',
    },
    flatBase: {
      type: 'boolean',
      control: 'boolean',
      description: 'Whether the badge has a flat base.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: 'Badge',
    variant: 'solid',
    colorScheme: 'blue',
    flatBase: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Solid: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  args: {
    variant: 'solid',
  },
};

export const Outline: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  args: {
    variant: 'outline',
  },
};

export const FlatBase: Story = {
  parameters: {
    controls: { exclude: ['flatBase'] },
  },
  args: {
    flatBase: true,
  },
};

export const KitchenSink: Story = {
  render: () => (
    <Box gap="200">
      <VariantTitle title="Blue - Solid">
        <Badge colorScheme="blue">Blue badge</Badge>
      </VariantTitle>
      <VariantTitle title="Green - Solid">
        <Badge colorScheme="green">Green badge</Badge>
      </VariantTitle>
      <VariantTitle title="Red - Solid">
        <Badge colorScheme="red">Red badge</Badge>
      </VariantTitle>
      <VariantTitle title="Orange - Solid">
        <Badge colorScheme="orange">Orange badge</Badge>
      </VariantTitle>
      <VariantTitle title="Grey - Solid">
        <Badge colorScheme="grey">Grey badge</Badge>
      </VariantTitle>
      <VariantTitle title="Blue - Outline">
        <Badge colorScheme="blue" variant="outline">
          Blue badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Green - Outline">
        <Badge colorScheme="green" variant="outline">
          Green badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Red - Outline">
        <Badge colorScheme="red" variant="outline">
          Red badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Orange - Outline">
        <Badge colorScheme="orange" variant="outline">
          Orange badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Grey - Outline">
        <Badge colorScheme="grey" variant="outline">
          Grey badge
        </Badge>
      </VariantTitle>
    </Box>
  ),
};
