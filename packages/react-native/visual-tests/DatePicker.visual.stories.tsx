import type { Meta, StoryObj } from '@storybook/react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '../src/components/BottomSheet';
import { DatePicker } from '../src/components/DatePicker';

const meta = {
  title: 'Visual Tests/DatePicker',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    // The delay lets the modal mount and measure before the capture.
    chromatic: { disableSnapshot: false, delay: 500 },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

// Fixed values only, never "today". Months are zero-based. The displayed month
// follows `date`, so the snapshot always shows March 2024.
const DATE = new Date(2024, 2, 15);
const MIN_DATE = new Date(2024, 2, 5);

/** Calendar sheet presented on mount, March 2024 with the 15th selected and days before the 5th disabled. */
export const Open: Story = {
  render: () => {
    const ref = useRef<BottomSheetModal>(null);

    useEffect(() => {
      ref.current?.present();
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <DatePicker ref={ref} mode="single" date={DATE} minDate={MIN_DATE} onChange={noop} />
        </BottomSheetModalProvider>
      </View>
    );
  },
};
