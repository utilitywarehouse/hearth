import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import Banner from './Banner';
import BannerImage from './BannerImage';

const meta: Meta<typeof BannerImage> = {
  title: 'Stories / BannerImage',
  component: BannerImage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BannerImage>;

export const Playground: Story = {
  render: () => (
    <View style={{ width: 400 }}>
      <Banner
        heading="Featured Content"
        description="Discover amazing content curated just for you."
        image={
          <BannerImage
            light={{
              uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
            }}
            dark={{
              uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&q=80',
            }}
          />
        }
      />
    </View>
  ),
};
