import type { Meta, StoryObj } from '@storybook/react-native';
import { Rating } from '../src/components/Rating';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Rating',
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
      <VTRow label="Stars selected">
        <Rating value={3} />
      </VTRow>
      <VTRow label="Stars disabled">
        <Rating value={4} disabled />
      </VTRow>
      <VTRow label="Stars hidden label">
        <Rating value={5} hideLabel />
      </VTRow>
      <VTRow label="Emojis empty">
        <Rating variant="emojis" value={0} />
      </VTRow>
      <VTRow label="Emojis selected">
        <Rating variant="emojis" value={4} />
      </VTRow>
      <VTRow label="Emojis disabled">
        <Rating variant="emojis" value={2} disabled />
      </VTRow>
    </VTGrid>
  ),
};
