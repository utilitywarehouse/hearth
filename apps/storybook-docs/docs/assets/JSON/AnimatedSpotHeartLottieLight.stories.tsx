/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHeartLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-heart-lottie-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotHeartLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHeartLottieLightStory: Story = {
  name: 'AnimatedSpotHeartLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHeartLottieLight} loop={true} />
    </div>
  ),
};
