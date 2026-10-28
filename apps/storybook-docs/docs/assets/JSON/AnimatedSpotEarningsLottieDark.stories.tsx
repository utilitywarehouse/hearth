/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEarningsLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-earnings--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotEarningsLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEarningsLottieDarkStory: Story = {
  name: 'AnimatedSpotEarningsLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEarningsLottieDark} loop={true} />
    </div>
  ),
};
