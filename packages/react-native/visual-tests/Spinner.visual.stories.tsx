import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Skeleton } from '../src/components/Skeleton';
import { Spinner } from '../src/components/Spinner';
import { VTGrid, VTRow } from './_support';

/**
 * Spinner and Skeleton are animated. Both render a static frame when reduced
 * motion is on (Spinner: a three-quarter arc, Skeleton: full opacity), so these
 * snapshots are only deterministic with reduced motion enabled on the device.
 */
const meta = {
  title: 'Visual Tests/Spinner & Skeleton',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const StaticFrames: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Spinner">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </VTRow>
      <VTRow label="Skeleton">
        <View style={{ width: '100%', gap: 8 }}>
          <Skeleton width="100%" height={16} />
          <Skeleton width="70%" height={16} />
          <Skeleton width={48} height={48} borderRadius="full" />
        </View>
      </VTRow>
    </VTGrid>
  ),
};
