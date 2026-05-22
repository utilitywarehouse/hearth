/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHowToVideosDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-how-to-videos-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotHowToVideosDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHowToVideosDarkStory: Story = {
  name: 'AnimatedSpotHowToVideosDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHowToVideosDark} loop={true} />
    </div>
  ),
};
