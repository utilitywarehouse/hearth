import { Meta, StoryObj } from '@storybook/react-native';
import { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { DateType, TimePicker } from '.';
import { ViewWrap } from '../../../docs/components';
import { BottomSheetModal } from '../BottomSheet';
import { Button } from '../Button';

const meta = {
  title: 'Stories / TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    use12Hours: {
      control: 'boolean',
      description: 'Display a 12-hour clock with AM/PM selector',
      defaultValue: false,
    },
    minuteInterval: {
      control: 'number',
      description: 'Step interval for minutes shown in the picker',
      defaultValue: 1,
    },
  },
  args: {
    use12Hours: false,
    minuteInterval: 1,
  },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = Story['args'];

export const Playground: Story = {
  render: (args: StoryArgs) => {
    const [selected, setSelected] = useState<DateType>();
    const modalRef = useRef<BottomSheetModal>(null);

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show Time Picker</Button>
          <TimePicker
            ref={modalRef}
            date={selected}
            use12Hours={args.use12Hours}
            minuteInterval={args.minuteInterval}
            onChange={({ date }) => setSelected(date)}
            onCancel={() => setSelected(undefined)}
          />
        </ViewWrap>
      </View>
    );
  },
};

export const TwelveHour: Story = {
  args: {
    use12Hours: true,
  },
  render: (args: StoryArgs) => {
    const [selected, setSelected] = useState<DateType>();
    const modalRef = useRef<BottomSheetModal>(null);

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show 12-hour Time Picker</Button>
          <TimePicker
            ref={modalRef}
            date={selected}
            use12Hours={args.use12Hours}
            minuteInterval={args.minuteInterval}
            onChange={({ date }) => setSelected(date)}
            onCancel={() => setSelected(undefined)}
          />
        </ViewWrap>
      </View>
    );
  },
};
