import type { Meta, StoryObj } from '@storybook/react-native';
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { UnstyledIconButton } from '../src/components/UnstyledIconButton';
import { VTGrid, VTInvertedStrip, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/UnstyledIconButton',
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
      <VTRow label="Unstyled md">
        <UnstyledIconButton icon={icon} accessibilityLabel="Default" />
        <UnstyledIconButton icon={icon} pressed accessibilityLabel="Pressed" />
        <UnstyledIconButton icon={icon} disabled accessibilityLabel="Disabled" />
        <UnstyledIconButton icon={icon} loading accessibilityLabel="Loading" />
      </VTRow>
      <VTRow label="Unstyled sm">
        <UnstyledIconButton size="sm" icon={icon} accessibilityLabel="Default" />
        <UnstyledIconButton size="sm" icon={icon} pressed accessibilityLabel="Pressed" />
        <UnstyledIconButton size="sm" icon={icon} disabled accessibilityLabel="Disabled" />
        <UnstyledIconButton size="sm" icon={icon} loading accessibilityLabel="Loading" />
      </VTRow>
      <VTInvertedStrip>
        <VTRow label="Inverted">
          <UnstyledIconButton icon={icon} inverted accessibilityLabel="Default" />
          <UnstyledIconButton icon={icon} inverted pressed accessibilityLabel="Pressed" />
          <UnstyledIconButton icon={icon} inverted disabled accessibilityLabel="Disabled" />
        </VTRow>
      </VTInvertedStrip>
    </VTGrid>
  ),
};
