/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSuccessLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-success--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSuccessLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSuccessLottieLightStory: Story = {
  name: 'AnimatedSpotSuccessLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSuccessLottieLight} loop={true} />
    </div>
  ),
};
