import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import DateTimePicker, { DateType } from '.';

const meta = {
  title: 'Stories / DatePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    mode: 'single',
  },
  render: () => {
    const [selected, setSelected] = useState<DateType>();

    return (
      <DateTimePicker mode="single" date={selected} onChange={({ date }) => setSelected(date)} />
    );
  },
};

export const Range: Story = {
  args: {
    mode: 'range',
  },
  render: () => {
    const [range, setRange] = useState<{
      startDate: DateType;
      endDate: DateType;
    }>({ startDate: undefined, endDate: undefined });
    return (
      <DateTimePicker
        mode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onChange={params => setRange(params)}
      />
    );
  },
};
