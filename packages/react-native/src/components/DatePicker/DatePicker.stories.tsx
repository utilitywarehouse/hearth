import { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { DatePicker, DateType } from '.';
import { ViewWrap } from '../../../docs/components';
import { BottomSheetModal, BottomSheetModalProvider } from '../BottomSheet';
import { Button } from '../Button';

// Calendar day buttons are exposed with an accessibilityLabel like "Wednesday, July 15",
// which react-native-web maps to the DOM accessible name (there is no aria-selected;
// ", selected" is appended to the label itself when a day is selected).
const DAY_BUTTON_NAME = /^[A-Za-z]+, [A-Za-z]+ \d+$/;

// The BottomSheetModal mounts its content asynchronously after `present()` is called,
// so opening it needs an explicit, generous wait before the calendar can be queried.
const openDatePicker = async (canvas: ReturnType<typeof within>, triggerName: string) => {
  await userEvent.click(await canvas.findByRole('button', { name: triggerName }));
  await canvas.findByTestId('calendar', {}, { timeout: 5000 });
};

const findDayButtons = (canvas: ReturnType<typeof within>) =>
  waitFor(
    () => {
      const days = canvas.getAllByRole('button', { name: DAY_BUTTON_NAME });
      expect(days.length).toBeGreaterThan(17);
      return days;
    },
    { timeout: 5000 }
  );

// Indexes chosen to always land within the currently displayed month (never a leading/trailing
// "outside day"), regardless of how many outside days lead the grid — so selecting them can't
// navigate the calendar to a different month out from under the test (single mode moves
// `currentDate`, and therefore the visible month, to whichever date is selected).
const FIRST_DAY_INDEX = 10;
const SECOND_DAY_INDEX = 17;

const meta = {
  title: 'Stories / DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
  decorators: [
    Story => (
      <BottomSheetModalProvider>
        <Story />
      </BottomSheetModalProvider>
    ),
  ],
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await openDatePicker(canvas, 'Show Date Picker');

    const days = await findDayButtons(canvas);
    const firstDayName = days[FIRST_DAY_INDEX]!.getAttribute('aria-label');
    const secondDayName = days[SECOND_DAY_INDEX]!.getAttribute('aria-label');

    // Pressing a day selects it.
    await userEvent.click(days[FIRST_DAY_INDEX]!);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: `${firstDayName}, selected` })).toBeInTheDocument()
    );

    // Pressing a different day moves the selection.
    await userEvent.click(canvas.getByRole('button', { name: secondDayName! }));
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: `${secondDayName}, selected` })
      ).toBeInTheDocument();
      expect(
        canvas.queryByRole('button', { name: `${firstDayName}, selected` })
      ).not.toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await openDatePicker(canvas, 'Show Range Date Picker');

    const days = await findDayButtons(canvas);
    const startDayName = days[FIRST_DAY_INDEX]!.getAttribute('aria-label');
    const endDayName = days[SECOND_DAY_INDEX]!.getAttribute('aria-label');

    // Pressing a start day selects it as the range start.
    await userEvent.click(days[FIRST_DAY_INDEX]!);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: `${startDayName}, selected` })).toBeInTheDocument()
    );

    // Pressing a later day selects it as the range end, keeping the start selected.
    await userEvent.click(canvas.getByRole('button', { name: endDayName! }));
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: `${startDayName}, selected` })
      ).toBeInTheDocument();
      expect(canvas.getByRole('button', { name: `${endDayName}, selected` })).toBeInTheDocument();
    });
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await openDatePicker(canvas, 'Show Multi Date Picker');

    const days = await findDayButtons(canvas);
    const firstDayName = days[FIRST_DAY_INDEX]!.getAttribute('aria-label');
    const secondDayName = days[SECOND_DAY_INDEX]!.getAttribute('aria-label');

    // Pressing multiple days accumulates the selection.
    await userEvent.click(days[FIRST_DAY_INDEX]!);
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: `${firstDayName}, selected` })).toBeInTheDocument()
    );

    await userEvent.click(canvas.getByRole('button', { name: secondDayName! }));
    await waitFor(() => {
      expect(
        canvas.getByRole('button', { name: `${firstDayName}, selected` })
      ).toBeInTheDocument();
      expect(
        canvas.getByRole('button', { name: `${secondDayName}, selected` })
      ).toBeInTheDocument();
    });

    // Pressing an already-selected day removes it.
    await userEvent.click(canvas.getByRole('button', { name: `${firstDayName}, selected` }));
    await waitFor(() => {
      expect(
        canvas.queryByRole('button', { name: `${firstDayName}, selected` })
      ).not.toBeInTheDocument();
      expect(
        canvas.getByRole('button', { name: `${secondDayName}, selected` })
      ).toBeInTheDocument();
    });
  },
};
