/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHowToVideos from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-how-to-videos-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotHowToVideos',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHowToVideosStory: Story = {
  name: 'AnimatedSpotHowToVideos',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHowToVideos} loop={true} />
    </div>
  ),
};
