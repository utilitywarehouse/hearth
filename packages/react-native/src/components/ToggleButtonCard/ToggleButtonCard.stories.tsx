import React from 'react';
import { ToggleButtonCard, ToggleButtonCardGroup } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { BodyText } from '../BodyText';

const meta = {
  title: 'Stories / ToggleButtonCard',
  component: ToggleButtonCard,
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
} satisfies Meta<typeof ToggleButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: 'Option 1',
    label: 'Label',
  },
  render: args => (
    <ToggleButtonCardGroup>
      <ToggleButtonCard
        aria-label="Label 1"
        onChange={(checked: boolean) => {
          console.log(checked, '###');
        }}
        nativeID="ToggleButtonCard-1"
        {...args}
      >
        <BodyText>Toggle Button Content</BodyText>
      </ToggleButtonCard>
    </ToggleButtonCardGroup>
  ),
};
