/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHeart from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-heart-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotHeart',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHeartStory: Story = {
  name: 'AnimatedSpotHeart',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHeart} loop={true} />
    </div>
  ),
};
