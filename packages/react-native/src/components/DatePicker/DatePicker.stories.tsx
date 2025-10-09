import { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { DatePicker, DateType } from '.';
import { ViewWrap } from '../../../docs/components';
import { BottomSheetModal } from '../BottomSheet';
import { Button } from '../Button';

const meta = {
  title: 'Stories / DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof DatePicker>;

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
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show Date Picker</Button>
          <DatePicker
            ref={modalRef}
            mode="single"
            date={selected}
            onChange={({ date }) => setSelected(date)}
            onCancel={() => setSelected(undefined)}
          />
        </ViewWrap>
      </View>
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
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show Range Date Picker</Button>
          <DatePicker
            mode="range"
            ref={modalRef}
            startDate={range.startDate}
            endDate={range.endDate}
            onChange={params => setRange(params)}
            onCancel={() => setRange({ startDate: undefined, endDate: undefined })}
          />
        </ViewWrap>
      </View>
    );
  },
};

export const Multi: Story = {
  args: {
    mode: 'multiple',
  },
  render: () => {
    const [dates, setDates] = useState<DateType[]>([]);
    const modalRef = useRef<BottomSheetModal>(null);
    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show Multi Date Picker</Button>
          <DatePicker
            mode="multiple"
            ref={modalRef}
            dates={dates}
            onChange={({ dates }) => setDates(dates)}
            onCancel={() => setDates([])}
          />
        </ViewWrap>
      </View>
    );
  },
};
