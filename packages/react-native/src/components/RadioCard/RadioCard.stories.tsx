import React from 'react';
import { RadioCard, RadioCardGroup } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { BodyText } from '../BodyText';

const meta = {
  title: 'Stories / RadioCard',
  component: RadioCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      type: 'string',
      control: 'text',
      description: 'The label component for the radio.',
    },
  },
  args: {
    label: '',
  },
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <RadioCardGroup>
      <RadioCard
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="RadioCard-1"
        {...args}
      >
        <BodyText>Radio Content</BodyText>
      </RadioCard>
    </RadioCardGroup>
  ),
};
