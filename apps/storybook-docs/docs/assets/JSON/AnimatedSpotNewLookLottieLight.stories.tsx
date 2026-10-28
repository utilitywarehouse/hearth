/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNewLookLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-new-look--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNewLookLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNewLookLottieLightStory: Story = {
  name: 'AnimatedSpotNewLookLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNewLookLottieLight} loop={true} />
    </div>
  ),
};
