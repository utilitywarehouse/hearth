import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio';
import { Flex } from '../Flex/Flex';
import { Root } from '@radix-ui/react-radio-group';

const meta: Meta<typeof Radio> = {
  title: 'Components / Radio',
  component: Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const RadioStory: Story = {
  name: 'Radio',
  render: args => {
    return (
      <Flex gap="32px">
        <Root>
          <Radio {...args} />
        </Root>
      </Flex>
    );
  },
  argTypes: {
    value: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    value: '1',
    disabled: false,
    label: 'Radio label',
    helperText: 'Radio helper text',
  },
};
