import type { Meta, StoryObj } from '@storybook/react-native';
import type { ImageSourcePropType } from 'react-native';
import pigs from '../docs/assets/pigs.png';
import { HighlightBanner, HighlightBannerImage } from '../src/components/HighlightBanner';
import { VTGrid } from './_support';

const meta = {
  title: 'Visual Tests/HighlightBanner',
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
      <HighlightBanner
        variant="emphasis"
        heading="Emphasis"
        headingColor="highlight"
        image={<HighlightBannerImage source={pigs as ImageSourcePropType} />}
        imageContainerHeight={100}
        description="Short text."
      />
      <HighlightBanner
        variant="subtle"
        heading="Subtle"
        headingColor="energy"
        image={<HighlightBannerImage source={pigs as ImageSourcePropType} />}
        imageContainerHeight={100}
        description="Short text."
      />
    </VTGrid>
  ),
};
