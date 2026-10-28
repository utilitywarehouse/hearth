/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotMovingHouseLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-moving-house--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotMovingHouseLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotMovingHouseLottieDarkStory: Story = {
  name: 'AnimatedSpotMovingHouseLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotMovingHouseLottieDark} loop={true} />
    </div>
  ),
};
