/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotMovingHouseLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-moving-house-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotMovingHouseLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotMovingHouseLottieLightStory: Story = {
  name: 'AnimatedSpotMovingHouseLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotMovingHouseLottieLight} loop={true} />
    </div>
  ),
};
