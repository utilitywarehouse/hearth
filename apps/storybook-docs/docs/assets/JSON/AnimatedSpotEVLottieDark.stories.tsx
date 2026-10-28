/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEVLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-ev-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotEVLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEVLottieDarkStory: Story = {
  name: 'AnimatedSpotEVLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEVLottieDark} loop={true} />
    </div>
  ),
};
