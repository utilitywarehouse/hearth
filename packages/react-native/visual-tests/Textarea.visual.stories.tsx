import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Textarea, TextareaField } from '../src/components/Textarea';
import { VTGrid, VTRow } from './_support';

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

/** Textarea built from its child part: TextareaField. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Textarea child parts">
        <View style={{ width: '100%' }}>
          <Textarea>
            <TextareaField caretHidden placeholder="Placeholder" />
          </Textarea>
        </View>
      </VTRow>
      <VTRow label="Textarea child parts invalid">
        <View style={{ width: '100%' }}>
          <Textarea validationStatus="invalid">
            <TextareaField caretHidden value="Invalid" onChangeText={noop} />
          </Textarea>
        </View>
      </VTRow>
      <VTRow label="Textarea child parts disabled">
        <View style={{ width: '100%' }}>
          <Textarea disabled>
            <TextareaField caretHidden value="Disabled" onChangeText={noop} />
          </Textarea>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
