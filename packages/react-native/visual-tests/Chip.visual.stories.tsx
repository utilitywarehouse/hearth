import type { Meta, StoryObj } from '@storybook/react-native';
import { Chip } from '../src/components/Chip';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Chip',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Chips: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Default">
        <Chip>Broadband</Chip>
      </VTRow>
      <VTRow label="Disabled">
        <Chip disabled>Mobile</Chip>
      </VTRow>
      <VTRow label="Wrapping">
        <Chip>Broadband</Chip>
        <Chip>Mobile</Chip>
        <Chip>Energy</Chip>
        <Chip>Insurance</Chip>
        <Chip>Cashback card</Chip>
        <Chip>Home phone</Chip>
        <Chip>A longer filter</Chip>
      </VTRow>
    </VTGrid>
  ),
};
