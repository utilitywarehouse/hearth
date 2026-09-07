import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PillGroup } from '.';
import { Pill } from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'Stories / Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Playground: Story = {
  args: {
    value: '1',
    label: 'Energy',
  },
  render: args => {
    const [value, setValue] = useState<string>(args.value);

    return (
      <PillGroup value={value} onChange={setValue}>
        <Pill {...args} />
      </PillGroup>
    );
  },
};
