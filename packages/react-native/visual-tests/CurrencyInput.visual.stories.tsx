import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { CurrencyInput } from '../src/components/CurrencyInput';

const meta = {
  title: 'Visual Tests/CurrencyInput',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8 }}>
    {children}
  </View>
);

const Cell = ({ children, fullWidth }: { children: ReactNode; fullWidth?: boolean }) => (
  <View style={{ width: fullWidth ? '100%' : '48%' }}>{children}</View>
);

/** CurrencyInput in two columns; the long value gets a full-width row. */
export const States: Story = {
  render: () => (
    <Cols>
      {/* A half-width cell is narrower than CurrencyInput is ever used, and Android scrolls an
          unfocused input to the end of a value that overflows, clipping its first digit. */}
      <Cell fullWidth>
        <CurrencyInput caretHidden value="1,234.50" onChangeText={noop} />
      </Cell>
      <Cell>
        <CurrencyInput caretHidden />
      </Cell>
      <Cell>
        <CurrencyInput caretHidden focused value="10.00" onChangeText={noop} />
      </Cell>
      <Cell>
        <CurrencyInput caretHidden disabled value="10.00" onChangeText={noop} />
      </Cell>
      <Cell>
        <CurrencyInput caretHidden validationStatus="valid" value="10.00" onChangeText={noop} />
      </Cell>
      <Cell>
        <CurrencyInput caretHidden validationStatus="invalid" value="10.00" onChangeText={noop} />
      </Cell>
    </Cols>
  ),
};
