/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNeighboursLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-neighbours-lottie-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNeighboursLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNeighboursLottieLightStory: Story = {
  name: 'AnimatedSpotNeighboursLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNeighboursLottieLight} loop={true} />
    </div>
  ),
};
