/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSuccessLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-success-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSuccessLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSuccessLottieDarkStory: Story = {
  name: 'AnimatedSpotSuccessLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSuccessLottieDark} loop={true} />
    </div>
  ),
};
