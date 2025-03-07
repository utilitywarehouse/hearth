import React from 'react';
import { Textarea } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Stories / Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The Textarea field placeholder',
      defaultValue: '',
    },

    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the Textarea component',
      defaultValue: 'initial',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the Textarea component',
      defaultValue: false,
    },
    readonly: {
      control: 'boolean',
      description: 'Read only the Textarea component',
      defaultValue: false,
    },
    focused: {
      control: 'boolean',
      description: 'Focus the Textarea component',
      defaultValue: false,
    },
  },
  args: {
    placeholder: 'Textarea placeholder',
    validationStatus: 'initial',
    disabled: false,
    readonly: false,
    focused: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
