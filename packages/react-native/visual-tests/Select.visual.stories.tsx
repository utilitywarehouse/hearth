import type { Meta, StoryObj } from '@storybook/react-native';
import { UserSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { BottomSheetModalProvider } from '../src/components/BottomSheet';
import type { BottomSheetModal } from '../src/components/BottomSheet';
import { Select } from '../src/components/Select';

const meta = {
  title: 'Visual Tests/Select',
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
];

const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 12 }}>
    {children}
  </View>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

const openOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const OpenSelect = () => {
  const sheetRef = useRef<BottomSheetModal>(null);

  // `Select` keeps its sheet ref private and has no `open` prop. A `ref` passed in
  // `bottomSheetProps` is spread after the internal one, so it takes over and
  // lets us call `present()` on mount.
  useEffect(() => {
    sheetRef.current?.present();
  }, []);

  return (
    <Select
      label="Open"
      options={openOptions}
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
        <OpenSelect />
      </View>
    </BottomSheetModalProvider>
  ),
};

/** Closed trigger states only. The open (bottom sheet) state is covered separately. */
export const ClosedStates: Story = {
  render: () => (
    <Cols>
      <Cell>
        <Select label="Placeholder" options={options} value={null} onValueChange={noop} />
      </Cell>
      <Cell>
        <Select label="Selected" options={options} value="2" onValueChange={noop} />
      </Cell>
      <Cell>
        <Select label="Disabled" options={options} value="2" onValueChange={noop} disabled />
      </Cell>
      <Cell>
        <Select label="Readonly" options={options} value="2" onValueChange={noop} readonly />
      </Cell>
      <Cell>
        <Select
          label="Valid"
          options={options}
          value="2"
          onValueChange={noop}
          validationStatus="valid"
          validText="Valid text"
        />
      </Cell>
      <Cell>
        <Select
          label="Invalid"
          options={options}
          value="2"
          onValueChange={noop}
          validationStatus="invalid"
          invalidText="Invalid text"
        />
      </Cell>
      <Cell>
        <Select
          label="Icon"
          options={options}
          value="2"
          onValueChange={noop}
          leadingIcon={UserSmallIcon}
        />
      </Cell>
      <Cell>
        <Select
          label="Helper"
          options={options}
          value={null}
          onValueChange={noop}
          helperText="Helper text"
          required={false}
        />
      </Cell>
    </Cols>
  ),
};
