/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSwitchLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-switch-lottie-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSwitchLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSwitchLottieLightStory: Story = {
  name: 'AnimatedSpotSwitchLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSwitchLottieLight} loop={true} />
    </div>
  ),
};
