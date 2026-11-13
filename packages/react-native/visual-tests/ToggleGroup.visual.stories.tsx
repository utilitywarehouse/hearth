import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { ToggleButton } from '../src/components/ToggleButton';
import { ToggleButtonCard } from '../src/components/ToggleButtonCard';
import { ToggleGroup } from '../src/components/ToggleGroup';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ToggleGroup',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleGroups: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Single">
        <ToggleGroup type="single" value="b" gap="200">
          <ToggleButton value="a" text="One" />
          <ToggleButton value="b" text="Two" />
          <ToggleButton value="c" text="Three" />
        </ToggleGroup>
      </VTRow>
      <VTRow label="Multiple">
        <ToggleGroup value={['a', 'c']} gap="200">
          <ToggleButton value="a" text="One" />
          <ToggleButton value="b" text="Two" />
          <ToggleButton value="c" text="Three" />
        </ToggleGroup>
      </VTRow>
      <VTRow label="Cards">
        {/* Full width: `VTRow` would otherwise shrink the cards to content width. */}
        <View style={{ width: '100%' }}>
          <ToggleGroup value={['a']} gap="200">
            <ToggleButtonCard value="a" label="Selected">
              <BodyText>Content</BodyText>
            </ToggleButtonCard>
            <ToggleButtonCard value="b" label="Unselected">
              <BodyText>Content</BodyText>
            </ToggleButtonCard>
          </ToggleGroup>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
