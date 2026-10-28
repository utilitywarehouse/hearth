/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEarningsLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-earnings-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotEarningsLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEarningsLottieLightStory: Story = {
  name: 'AnimatedSpotEarningsLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEarningsLottieLight} loop={true} />
    </div>
  ),
};
