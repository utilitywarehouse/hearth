import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Textarea } from '../src/components/Textarea';

const meta = {
  title: 'Visual Tests/Textarea',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/** Two-column grid. The textarea text doubles as the label, which keeps it dense. */
const Cols = ({ children }: { children: ReactNode }) => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 8, rowGap: 8 }}>
    {children}
  </View>
);

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

export const States: Story = {
  render: () => (
    <Cols>
      <Cell>
        <Textarea caretHidden placeholder="Placeholder" />
      </Cell>
      <Cell>
        <Textarea caretHidden value="Filled" onChangeText={noop} />
      </Cell>
      <Cell>
        <Textarea caretHidden focused value="Focused" onChangeText={noop} />
      </Cell>
      <Cell>
        <Textarea caretHidden disabled value="Disabled" onChangeText={noop} />
      </Cell>
      <Cell>
        <Textarea caretHidden readonly value="Readonly" onChangeText={noop} />
      </Cell>
      <Cell>
        <Textarea caretHidden validationStatus="valid" value="Valid" onChangeText={noop} />
      </Cell>
      <Cell>
        <Textarea caretHidden validationStatus="invalid" value="Invalid" onChangeText={noop} />
      </Cell>
      <Cell>
        <Textarea
          caretHidden
          label="Label"
          helperText="Helper"
          value="Labelled"
          onChangeText={noop}
        />
      </Cell>
    </Cols>
  ),
};
