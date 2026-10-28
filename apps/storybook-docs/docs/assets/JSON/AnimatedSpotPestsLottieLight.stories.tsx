/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotPestsLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-pests-lottie-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotPestsLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotPestsLottieLightStory: Story = {
  name: 'AnimatedSpotPestsLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotPestsLottieLight} loop={true} />
    </div>
  ),
};
