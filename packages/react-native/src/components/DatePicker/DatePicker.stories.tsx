import { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import DateTimePicker, { DateType } from '.';
import { BottomSheetModal } from '../BottomSheet';
import { Button } from '../Button';

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
    const modalRef = useRef<BottomSheetModal>(null);

    return (
      <>
        <Button onPress={() => modalRef.current?.present()}>Show Date Picker</Button>
        <DateTimePicker
          ref={modalRef}
          mode="single"
          date={selected}
          onChange={({ date }) => setSelected(date)}
          onCancel={() => setSelected(undefined)}
        />
      </>
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
    const modalRef = useRef<BottomSheetModal>(null);
    return (
      <>
        <Button onPress={() => modalRef.current?.present()}>Show Range Date Picker</Button>
        <DateTimePicker
          mode="range"
          ref={modalRef}
          startDate={range.startDate}
          endDate={range.endDate}
          onChange={params => setRange(params)}
          onCancel={() => setRange({ startDate: undefined, endDate: undefined })}
        />
      </>
    );
  },
};
