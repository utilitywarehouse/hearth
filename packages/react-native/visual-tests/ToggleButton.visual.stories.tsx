import type { Meta, StoryObj } from '@storybook/react-native';
import { ToggleButton } from '../src/components/ToggleButton';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ToggleButton',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleButtons: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Off">
        <ToggleButton text="Off" />
      </VTRow>
      <VTRow label="On">
        <ToggleButton toggled text="On" />
      </VTRow>
    </VTGrid>
  ),
};
