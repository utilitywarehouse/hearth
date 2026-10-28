/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEVLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-ev--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotEVLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEVLottieLightStory: Story = {
  name: 'AnimatedSpotEVLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEVLottieLight} loop={true} />
    </div>
  ),
};
