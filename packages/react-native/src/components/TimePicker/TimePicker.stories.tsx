import { Meta, StoryObj } from '@storybook/react-native';
import { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DateType, TimePicker } from '.';
import { ViewWrap } from '../../../docs/components';
import { BodyText } from '../BodyText';
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
          <BodyText>{selected ? 'Confirmed' : 'Not confirmed'}</BodyText>
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
  play: async ({ canvasElement }) => {
    // Pressing Ok without scrolling either wheel must still commit the currently
    // shown time (defaults to "now" when no `date` prop is passed).
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Show Time Picker' }));
    const okButton = await canvas.findByRole('button', { name: 'Ok' });
    await userEvent.click(okButton);
    await waitFor(() => {
      expect(canvas.getByText('Confirmed')).toBeInTheDocument();
    });
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
