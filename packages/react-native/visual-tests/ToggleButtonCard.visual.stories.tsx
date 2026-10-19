import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { ToggleButtonCard, ToggleButtonCardGroup } from '../src/components/ToggleButtonCard';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ToggleButtonCard',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="ToggleButtonCard">
        {/* Full width: `VTRow` would otherwise shrink the cards to content width. */}
        <View style={{ width: '100%' }}>
          <ToggleButtonCardGroup value="a" onValueChange={noop} flexWrap="nowrap">
            <ToggleButtonCard value="a" label="Selected">
              <BodyText>Content</BodyText>
            </ToggleButtonCard>
            <ToggleButtonCard value="b" label="Unselected">
              <BodyText>Content</BodyText>
            </ToggleButtonCard>
          </ToggleButtonCardGroup>
        </View>
      </VTRow>
      <VTRow label="Disabled">
        <View style={{ width: '100%' }}>
          <ToggleButtonCardGroup value="a" onValueChange={noop} flexWrap="nowrap">
            <ToggleButtonCard value="a" label="Selected" disabled>
              <BodyText>Content</BodyText>
            </ToggleButtonCard>
            <ToggleButtonCard value="b" label="Unselected" disabled>
              <BodyText>Content</BodyText>
            </ToggleButtonCard>
          </ToggleButtonCardGroup>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
