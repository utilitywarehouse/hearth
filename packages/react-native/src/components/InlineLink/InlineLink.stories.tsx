import React from 'react';
import { InlineLink } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Stories / InlineLink',
  component: InlineLink,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      type: 'string',
      control: 'text',
      description: 'The text of the button.',
    },
    href: {
      type: 'string',
      control: 'text',
      description: 'The URL the link will navigate to.',
    },
    target: {
      options: ['_blank', '_self', '_parent', '_top'],
      control: 'select',
      description: 'The target of the link.',
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the button.',
    },
    inverted: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be inverted. (To only be used on `purple` backgrounds)',
    },
  },
  args: {
    children: 'InlineLink',
    href: 'https://www.uw.co.uk',
    target: '_blank',
    disabled: false,
    inverted: false,
  },
} satisfies Meta<typeof InlineLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
