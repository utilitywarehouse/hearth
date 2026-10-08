import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { DatePickerInput } from '../src/components/DatePickerInput';

const meta = {
  title: 'Visual Tests/DatePickerInput',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

// Fixed value only, never "today". Months are zero-based.
const DATE = new Date(2024, 2, 15);

const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8 }}>
    {children}
  </View>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

/** Closed inputs only. The date picker sheet is not opened. */
export const States: Story = {
  render: () => (
    <Cols>
      <Cell>
        <DatePickerInput caretHidden onChange={noop} />
      </Cell>
      <Cell>
        <DatePickerInput caretHidden value={DATE} onChange={noop} />
      </Cell>
      <Cell>
        <DatePickerInput caretHidden focused value={DATE} onChange={noop} />
      </Cell>
      <Cell>
        <DatePickerInput caretHidden disabled value={DATE} onChange={noop} />
      </Cell>
      <Cell>
        <DatePickerInput caretHidden readonly value={DATE} onChange={noop} />
      </Cell>
      <Cell>
        <DatePickerInput caretHidden validationStatus="valid" value={DATE} onChange={noop} />
      </Cell>
      <Cell>
        <DatePickerInput caretHidden validationStatus="invalid" value={DATE} onChange={noop} />
      </Cell>
    </Cols>
  ),
};
