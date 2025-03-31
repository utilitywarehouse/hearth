import React from 'react';
import { Radio, RadioGroup } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the radio.',
    },
    label: {
      type: 'string',
      control: 'text',
      description: 'The label component for the radio.',
    },
    helperText: {
      type: 'string',
      control: 'text',
      description: 'The helper text of the radio component',
      defaultValue: 'Helper text',
    },
    validationStatus: {
      control: 'select',
      options: ['initial', 'valid', 'invalid'],
      description: 'The validation status of the radio component',
      defaultValue: 'initial',
    },
    showValidationIcon: {
      control: 'boolean',
      description: 'Show the validation icon.',
      defaultValue: true,
    },
    invalidText: {
      control: 'text',
      description: 'The invalid text of the radio component',
      defaultValue: 'Invalid text',
    },
    type: {
      control: 'select',
      options: ['radio', 'card'],
      description: 'The type of the radio component',
      defaultValue: 'radio',
    },
  },
  args: {
    disabled: false,
    label: '',
    helperText: '',
    validationStatus: 'initial',
    showValidationIcon: true,
    invalidText: 'Invalid text',
    validText: 'Valid text',
    type: 'radio',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <RadioGroup>
      <Radio
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="Radio-1"
        {...args}
      />
    </RadioGroup>
  ),
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['value', 'label', 'disabled'] },
  },
  args: {
    value: 'Option 1',
  },
  render: ({ value: _, children: __, label: ___, disabled: _____, onChange: ______, ...args }) => {
    const [value, setValue] = React.useState('Option 1');
    return (
      <Flex space="lg">
        <VariantTitle title="Default">
          <RadioGroup
            aria-label="Radio Group"
            value={value}
            onChange={setValue}
            nativeID="Radio-group"
          >
            <Radio
              value="Option 1"
              aria-label="Option 1"
              onChange={(checked: boolean) => {
                console.log(checked, '###');
              }}
              nativeID="Radio-1"
              label="Option 1"
              {...args}
            />
            <Radio
              value="Option 2"
              aria-label="Option 2"
              onChange={(checked: boolean) => {
                console.log(checked, '###');
              }}
              nativeID="Radio-2"
              label="Option 2"
              {...args}
            />
          </RadioGroup>
        </VariantTitle>
        <VariantTitle title="Disabled">
          <RadioGroup
            aria-label="Radio Group"
            value={value}
            onChange={setValue}
            nativeID="Radio-group"
            disabled
          >
            <Radio
              aria-label="Option 3"
              value="Option 1"
              onChange={(checked: boolean) => console.log(checked, '###')}
              nativeID="Radio-3"
              label="Option 1"
              {...args}
            />
            <Radio
              aria-label="Option 4"
              value="Option 2"
              onChange={(checked: boolean) => console.log(checked, '###')}
              nativeID="Radio-4"
              label="Option 2"
              {...args}
            />
          </RadioGroup>
        </VariantTitle>
      </Flex>
    );
  },
};
