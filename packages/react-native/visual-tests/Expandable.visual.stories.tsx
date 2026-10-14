import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { Expandable } from '../src/components/Expandable';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Expandable',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const content = (
  <>
    <BodyText>First line</BodyText>
    <BodyText>Second line</BodyText>
    <BodyText>Third line</BodyText>
  </>
);

/** Expanded and collapsed, set through the `expanded` prop. */
export const States: Story = {
  // The height comes from an `onLayout` measurement after mount, so allow it to settle.
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  render: () => (
    <VTGrid>
      <VTRow label="Expanded">
        <View style={{ width: '100%', borderWidth: 1 }}>
          <Expandable expanded>{content}</Expandable>
        </View>
      </VTRow>
      <VTRow label="Collapsed">
        <View style={{ width: '100%', borderWidth: 1 }}>
          <Expandable expanded={false}>{content}</Expandable>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
