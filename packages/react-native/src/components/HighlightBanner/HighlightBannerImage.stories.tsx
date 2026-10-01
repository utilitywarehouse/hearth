import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import HighlightBanner from './HighlightBanner';
import HighlightBannerImage from './HighlightBannerImage';

const meta: Meta<typeof HighlightBannerImage> = {
  title: 'Stories / HighlightBannerImage',
  component: HighlightBannerImage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HighlightBannerImage>;

export const Playground: Story = {
  render: () => (
    <View style={{ width: 400 }}>
      <HighlightBanner
        heading="Featured Content"
        headingColor="highlight"
        description="This is a description of the featured content that appears below the image."
        image={
          <HighlightBannerImage
            source={{
              uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
            }}
          />
        }
      />
    </View>
  ),
};
