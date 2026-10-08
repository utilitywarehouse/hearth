import type { Meta, StoryObj } from '@storybook/react-native';
import { BodyText } from '../src/components/BodyText';
import { RadioCard, RadioCardGroup } from '../src/components/RadioCard';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/RadioCard',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/** RadioCard: selected, unselected and disabled. */
export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="RadioCard">
        <RadioCardGroup value="a" onValueChange={noop} flexWrap="nowrap">
          <RadioCard value="a" label="Selected">
            <BodyText>Content</BodyText>
          </RadioCard>
          <RadioCard value="b" label="Unselected">
            <BodyText>Content</BodyText>
          </RadioCard>
        </RadioCardGroup>
      </VTRow>
      <VTRow label="RadioCard disabled">
        <RadioCardGroup value="a" onValueChange={noop} disabled flexWrap="nowrap">
          <RadioCard value="a" label="Selected">
            <BodyText>Content</BodyText>
          </RadioCard>
          <RadioCard value="b" label="Unselected">
            <BodyText>Content</BodyText>
          </RadioCard>
        </RadioCardGroup>
      </VTRow>
    </VTGrid>
  ),
};
