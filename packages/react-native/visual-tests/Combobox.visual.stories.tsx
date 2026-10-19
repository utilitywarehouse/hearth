import type { Meta, StoryObj } from '@storybook/react-native';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModalProvider } from '../src/components/BottomSheet';
import type { BottomSheetModal } from '../src/components/BottomSheet';
import { Combobox } from '../src/components/Combobox';

const meta = {
  title: 'Visual Tests/Combobox',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const OpenCombobox = () => {
  const sheetRef = useRef<BottomSheetModal>(null);

  // `Combobox` keeps its sheet ref private and has no `open` prop. A `ref` passed in
  // `bottomSheetProps` is spread after the internal one, so it takes over and lets us
  // call `present()` on mount. Opening this way skips the trigger press handler, so the
  // search input is never auto-focused.
  useEffect(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <Combobox
      label="Open"
      options={options}
      value="2"
      onValueChange={noop}
      menuHeading="Select an option"
      bottomSheetProps={{ ref: sheetRef, animationConfigs: { duration: 0 } }}
    />
  );
};

/** Options sheet open with one option selected. */
export const Open: Story = {
  // Opened through the portal, so allow it to settle before the capture.
  parameters: { chromatic: { disableSnapshot: false, delay: 500 } },
  render: () => (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <OpenCombobox />
      </View>
    </BottomSheetModalProvider>
  ),
};
