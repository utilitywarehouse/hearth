/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotErrorLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-error--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotErrorLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotErrorLottieLightStory: Story = {
  name: 'AnimatedSpotErrorLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotErrorLottieLight} loop={true} />
    </div>
  ),
};
