import React from 'react';
import { Radio, RadioGroup } from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Stories / RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the radio group.',
    },
    label: {
      type: 'string',
      control: 'text',
      description: 'The label component for the radio group.',
    },
    helperText: {
      type: 'string',
      control: 'text',
      description: 'The helper text of the radio group component',
      defaultValue: 'Helper text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the radio group component',
      defaultValue: 'initial',
    },
    showValidationIcon: {
      control: 'boolean',
      description: 'Show the validation icon.',
      defaultValue: true,
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text of the radio group component',
      defaultValue: 'Invalid text',
    },
    type: {
      control: 'select',
      options: ['radio', 'card'],
      description: 'The type of the radio group component',
      defaultValue: 'radio',
    },
  },
  args: {
    disabled: false,
    label: 'Group label',
    helperText: 'Supporting text',
    validationStatus: 'initial',
    showValidationIcon: true,
    invalidText: 'Invalid text',
    validText: 'Valid text',
    type: 'radio',
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
  },
  render: ({ value: _, ...args }) => (
    <RadioGroup {...args}>
      <Radio aria-label="Label 1" label="Option 1" value="Option 1" nativeID="Radio-1" />
      <Radio aria-label="Label 2" label="Option 2" value="Option 2" nativeID="Radio-2" />
      <Radio aria-label="Label 3" label="Option 3" value="Option 3" nativeID="Radio-3" />
    </RadioGroup>
  ),
};
