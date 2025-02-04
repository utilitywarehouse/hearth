import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { BodyText } from '.';
import { coloursAsArray } from '../../utils';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'React Native / Components / BodyText',
  component: BodyText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
      description: 'The size of the text.',
    },
    highlight: {
      type: 'boolean',
      control: 'boolean',
      description: 'Highlight the text.',
    },
    truncated: {
      type: 'boolean',
      control: 'boolean',
      description: 'Truncate the text.',
    },
    bold: {
      type: 'boolean',
      control: 'boolean',
      description: 'Bold the text.',
    },
    italic: {
      type: 'boolean',
      control: 'boolean',
      description: 'Italicize the text.',
    },
    underline: {
      type: 'boolean',
      control: 'boolean',
      description: 'Underline the text.',
    },
    strikeThrough: {
      type: 'boolean',
      control: 'boolean',
      description: 'Strike through the text.',
    },
    color: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the text. Use the color name from the theme.',
    },
    textDecorationLine: {
      options: ['none', 'underline', 'line-through'],
      control: 'select',
      description: 'Text decoration line.',
    },
    textDecorationColor: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the text decoration. Use the color name from the theme.',
    },
    textTransform: {
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      control: 'select',
      description: 'Transform the text.',
    },
    textAlign: {
      options: ['auto', 'left', 'right', 'center', 'justify'],
      control: 'select',
      description: 'Align the text horizontally.',
    },
    textDecorationStyle: {
      options: ['solid', 'double', 'dotted', 'dashed'],
      control: 'select',
      description: 'Style of the text decoration.',
    },
    textAlignVertical: {
      options: ['auto', 'top', 'bottom', 'center'],
      control: 'select',
      description: 'Align the text vertically.',
    },
    userSelect: {
      options: ['auto', 'none', 'text', 'contain', 'all', 'all-scroll', 'auto', 'unset'],
      control: 'select',
      description: 'User select.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: "Hello there, I'm some body text!",
    size: 'md',
    highlight: false,
    truncated: false,
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
  },
} satisfies Meta<typeof BodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Workshop: Story = {};

export const Bold: Story = {
  args: {
    bold: true,
  },
};

export const Underline: Story = {
  args: {
    underline: true,
  },
};

export const KitchenSink: Story = {
  render: args => (
    <Box gap="200">
      <VariantTitle title="Small">
        <BodyText {...args} size="sm">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
      <VariantTitle title="Medium">
        <BodyText {...args} size="md">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
      <VariantTitle title="Large">
        <BodyText {...args} size="lg">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
    </Box>
  ),
};
