/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHowToVideosLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-how-to-videos-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotHowToVideosLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHowToVideosLightStory: Story = {
  name: 'AnimatedSpotHowToVideosLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHowToVideosLight} loop={true} />
    </div>
  ),
};
