import React, { useEffect, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box } from '.';
import { BodyText } from '../BodyText';
import { coloursAsArray } from '../../utils';
import { primitive } from '@utilitywarehouse/hearth-tokens/js';
import { InputType } from 'storybook/internal/types';

const backgroundColor: InputType = {
  options: coloursAsArray(),
  control: 'select',
  description: 'Background color of the box.',
};

const height: InputType = {
  control: 'number',
  description: 'Height of the box.',
};

const width: InputType = {
  control: 'number',
  description: 'Width of the box.',
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Box',
  component: Box,
  parameters: {
    // Optional parameter to Box the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: 'text' },
    backgroundColor,
    bg: backgroundColor,
    bgColor: backgroundColor,
    padding: {
      options: Object.keys(primitive.space),
      control: 'select',
      description: 'Padding of the box.',
    },
    height,
    h: height,
    width,
    w: width,
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: "Hello there, I'm in a box!",
    backgroundColor: 'orange400',
    padding: '200',
    width: 300,
    height: 200,
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ as: _, ...args }) => {
    return (
      <Box {...args}>
        <BodyText>{args.children}</BodyText>
      </Box>
    );
  },
};
