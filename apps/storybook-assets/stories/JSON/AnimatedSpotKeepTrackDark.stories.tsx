/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotKeepTrackDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-keep-track-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotKeepTrackDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotKeepTrackDarkStory: Story = {
  name: 'AnimatedSpotKeepTrackDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotKeepTrackDark} loop={true} />
    </div>
  ),
};
