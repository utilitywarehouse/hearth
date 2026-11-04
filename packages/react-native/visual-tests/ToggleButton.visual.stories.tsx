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
      <VTRow label="Disabled">
        <ToggleButton disabled text="Off" />
        <ToggleButton disabled toggled text="On" />
      </VTRow>
    </VTGrid>
  ),
};

export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Off">
        <ToggleButton>
          <ToggleButtonIcon as={MobileSmallIcon} />
          <ToggleButtonText>Mobile</ToggleButtonText>
        </ToggleButton>
      </VTRow>
      <VTRow label="On">
        <ToggleButton toggled>
          <ToggleButtonIcon as={MobileSmallIcon} />
          <ToggleButtonText>Mobile</ToggleButtonText>
        </ToggleButton>
      </VTRow>
    </VTGrid>
  ),
};
