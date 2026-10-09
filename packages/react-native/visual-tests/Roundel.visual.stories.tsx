import type { Meta, StoryObj } from '@storybook/react-native';
import { Roundel } from '../src/components/Roundel';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Roundel',
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
      <VTRow label="Success">
        <Roundel variant="success" />
      </VTRow>
      <VTRow label="Pending">
        <Roundel variant="pending" />
      </VTRow>
      <VTRow label="Error">
        <Roundel variant="error" />
      </VTRow>
    </VTGrid>
  ),
};
