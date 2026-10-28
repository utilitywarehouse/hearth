/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHeartLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-heart-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotHeartLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHeartLottieDarkStory: Story = {
  name: 'AnimatedSpotHeartLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHeartLottieDark} loop={true} />
    </div>
  ),
};
