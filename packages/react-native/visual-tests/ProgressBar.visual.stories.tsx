import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { ProgressBar } from '../src/components/ProgressBar';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ProgressBar',
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
      <VTRow label="Linear">
        <View style={{ width: '100%', gap: 12 }}>
          <ProgressBar label="Default" value={40} />
          <ProgressBar label="Success" colorScheme="success" value={100} />
          <ProgressBar label="Danger" colorScheme="danger" value={70} />
          <ProgressBar label="Hidden label" value={60} hideLabel />
        </View>
      </VTRow>
      <VTRow label="Circular medium">
        <ProgressBar variant="circular" label="Default" value={40} />
        <ProgressBar variant="circular" label="Success" colorScheme="success" value={100} />
        <ProgressBar variant="circular" label="Danger" colorScheme="danger" value={70} />
      </VTRow>
      <VTRow label="Circular small">
        <ProgressBar variant="circular" size="sm" label="Default" value={40} />
        <ProgressBar
          variant="circular"
          size="sm"
          label="Success"
          colorScheme="success"
          value={100}
        />
        <ProgressBar variant="circular" size="sm" label="Danger" colorScheme="danger" value={70} />
      </VTRow>
    </VTGrid>
  ),
};
