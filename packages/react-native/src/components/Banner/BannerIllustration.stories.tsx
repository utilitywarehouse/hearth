import { Meta, StoryObj } from '@storybook/react-native';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';
import { View } from 'react-native';
import Banner from './Banner';
import BannerIllustration from './BannerIllustration';

const meta: Meta<typeof BannerIllustration> = {
  title: 'Stories / BannerIllustration',
  component: BannerIllustration,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BannerIllustration>;

export const Playground: Story = {
  render: () => (
    <View>
      <Banner
        heading="Featured Content"
        description="Discover amazing content curated just for you."
        illustration={
          <BannerIllustration
            light={
              // @ts-expect-error - Illustration SVG import
              <SpotBillingLight width={80} height={80} />
            }
            dark={
              // @ts-expect-error - Illustration SVG import
              <SpotBillingDark width={80} height={80} />
            }
          />
        }
      />
    </View>
  ),
};
