import type { Meta, StoryObj } from '@storybook/react-native';
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { IndicatorIconButton } from '../src/components/IndicatorIconButton';
import { VTGrid, VTInvertedStrip, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/IndicatorIconButton',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const icon = MobileSmallIcon;

export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Indicator off, on, pressed">
        <IndicatorIconButton icon={icon} accessibilityLabel="Off" />
        <IndicatorIconButton icon={icon} indicator accessibilityLabel="On" />
        <IndicatorIconButton icon={icon} indicator pressed accessibilityLabel="Pressed" />
      </VTRow>
      <VTInvertedStrip>
        <VTRow label="Inverted">
          <IndicatorIconButton icon={icon} inverted accessibilityLabel="Off" />
          <IndicatorIconButton icon={icon} inverted indicator accessibilityLabel="On" />
        </VTRow>
      </VTInvertedStrip>
    </VTGrid>
  ),
};
