import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { TimePickerInput } from '../src/components/TimePickerInput';

const meta = {
  title: 'Visual Tests/TimePickerInput',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

// Fixed value only, never "now". Months are zero-based.
const TIME = new Date(2024, 0, 1, 9, 30);

const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8 }}>
    {children}
  </View>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

/** Closed inputs only. The time picker sheet is not opened. */
export const States: Story = {
  render: () => (
    <Cols>
      <Cell>
        <TimePickerInput caretHidden onChange={noop} />
      </Cell>
      <Cell>
        <TimePickerInput caretHidden value={TIME} onChange={noop} />
      </Cell>
      <Cell>
        <TimePickerInput caretHidden focused value={TIME} onChange={noop} />
      </Cell>
      <Cell>
        <TimePickerInput caretHidden disabled value={TIME} onChange={noop} />
      </Cell>
      <Cell>
        <TimePickerInput caretHidden validationStatus="invalid" value={TIME} onChange={noop} />
      </Cell>
    </Cols>
  ),
};
