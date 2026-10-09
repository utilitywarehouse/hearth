import type { Meta, StoryObj } from '@storybook/react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '../src/components/BottomSheet';
import { TimePicker } from '../src/components/TimePicker';

const meta = {
  title: 'Visual Tests/TimePicker',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    // The delay lets the modal mount and the wheels settle before the capture.
    chromatic: { disableSnapshot: false, delay: 500 },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

// Fixed values only, never "now". Months are zero-based.
const TIME = new Date(2024, 0, 1, 9, 30);

/** Time sheet presented on mount with the wheels set to 09:30. */
export const Open: Story = {
  render: () => {
    const ref = useRef<BottomSheetModal>(null);

    useEffect(() => {
      ref.current?.present();
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <TimePicker ref={ref} date={TIME} onChange={noop} />
        </BottomSheetModalProvider>
      </View>
    );
  },
};
