/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotHowToVideos from '@utilitywarehouse/hearth-json-assets/lib/spot-how-to-videos-light.json';

const meta: Meta = {
  title: 'JSON / SpotHowToVideos',
};

export default meta;
type Story = StoryObj;

export const SpotHowToVideosStory: Story = {
  name: 'SpotHowToVideos',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotHowToVideos} loop={true} />
    </div>
  ),
};
