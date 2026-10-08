import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { LI, OL, UL } from '../src/components/HTMLElements';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/OrderedList & UnorderedList',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <VTGrid>
      {/* Full-width wrappers: `VTRow` lays children out in a wrapping row, which
          shrinks the lists to content width and collapses the item text. */}
      <VTRow label="Ordered">
        <View style={{ width: '100%' }}>
          <OL>
            <LI>First item</LI>
            <LI>Second item</LI>
            <LI>Third item</LI>
          </OL>
        </View>
      </VTRow>
      <VTRow label="Unordered">
        <View style={{ width: '100%' }}>
          <UL>
            <LI>First item</LI>
            <LI>Second item</LI>
            <LI>Third item</LI>
          </UL>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
