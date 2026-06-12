/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotKeepTrackLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-keep-track-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotKeepTrackLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotKeepTrackLightStory: Story = {
  name: 'AnimatedSpotKeepTrackLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotKeepTrackLight} loop={true} />
    </div>
  ),
};
