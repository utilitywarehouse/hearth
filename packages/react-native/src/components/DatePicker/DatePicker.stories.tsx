import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DatePicker, DateType } from '.';
import { ViewWrap } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { BottomSheetModal } from '../BottomSheet';
import { Button } from '../Button';

const PREFILLED_DATE = dayjs().startOf('day').toDate();

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
    const [confirmedDate, setConfirmedDate] = useState<DateType>();
    const modalRef = useRef<BottomSheetModal>(null);

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show Date Picker</Button>
          <BodyText>
            {confirmedDate ? `Confirmed: ${dayjs(confirmedDate).format('YYYY-MM-DD')}` : 'Not confirmed'}
          </BodyText>
          <DatePicker
            ref={modalRef}
            mode="single"
            date={selected}
            onChange={({ date }) => {
              setSelected(date);
              setConfirmedDate(date);
            }}
            onCancel={() => setSelected(undefined)}
          />
        </ViewWrap>
      </View>
    );
  },
  play: async ({ canvasElement }) => {
    // Opening with no prior selection and pressing Ok without picking a day must not
    // commit anything — this is the "required date field" safety case.
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Show Date Picker' }));
    const okButton = await canvas.findByRole('button', { name: 'Ok' });
    await userEvent.click(okButton);
    await waitFor(() => {
      expect(canvas.getByText('Not confirmed')).toBeInTheDocument();
    });
  },
};

export const ConfirmPrefilledDate: Story = {
  args: {
    mode: 'single',
  },
  render: () => {
    const [selected, setSelected] = useState<DateType>(PREFILLED_DATE);
    const [confirmedDate, setConfirmedDate] = useState<DateType>();
    const modalRef = useRef<BottomSheetModal>(null);

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
        <ViewWrap>
          <Button onPress={() => modalRef.current?.present()}>Show Date Picker</Button>
          <BodyText>
            {confirmedDate ? `Confirmed: ${dayjs(confirmedDate).format('YYYY-MM-DD')}` : 'Not confirmed'}
          </BodyText>
          <DatePicker
            ref={modalRef}
            mode="single"
            date={selected}
            onChange={({ date }) => {
              setSelected(date);
              setConfirmedDate(date);
            }}
            onCancel={() => setSelected(PREFILLED_DATE)}
          />
        </ViewWrap>
      </View>
    );
  },
  play: async ({ canvasElement }) => {
    // Opening with an already-selected date (e.g. editing an existing record) and
    // pressing Ok without tapping a day must still commit that date via onChange.
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Show Date Picker' }));
    const okButton = await canvas.findByRole('button', { name: 'Ok' });
    await userEvent.click(okButton);
    await waitFor(() => {
      expect(
        canvas.getByText(`Confirmed: ${dayjs(PREFILLED_DATE).format('YYYY-MM-DD')}`)
      ).toBeInTheDocument();
    });
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
