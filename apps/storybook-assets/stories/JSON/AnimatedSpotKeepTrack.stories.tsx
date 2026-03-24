/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotKeepTrack from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-keep-track-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotKeepTrack',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotKeepTrackStory: Story = {
  name: 'AnimatedSpotKeepTrack',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotKeepTrack} loop={true} />
    </div>
  ),
};
