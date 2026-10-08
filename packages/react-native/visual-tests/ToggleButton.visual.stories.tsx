import type { Meta, StoryObj } from '@storybook/react-native';
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { ToggleButton, ToggleButtonIcon, ToggleButtonText } from '../src/components/ToggleButton';
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

/** Toggle buttons composed from `ToggleButtonIcon` and `ToggleButtonText` child parts. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Custom icon">
        <ToggleButton>
          <ToggleButtonIcon toggled={false} as={MobileSmallIcon} />
          <ToggleButtonText toggled={false}>Off</ToggleButtonText>
        </ToggleButton>
        <ToggleButton toggled>
          <ToggleButtonIcon toggled as={MobileSmallIcon} />
          <ToggleButtonText toggled>On</ToggleButtonText>
        </ToggleButton>
      </VTRow>
    </VTGrid>
  ),
};
