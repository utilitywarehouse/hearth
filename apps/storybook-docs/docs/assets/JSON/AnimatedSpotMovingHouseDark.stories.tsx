/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotMovingHouseDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-moving-house-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotMovingHouseDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotMovingHouseDarkStory: Story = {
  name: 'AnimatedSpotMovingHouseDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotMovingHouseDark} loop={true} />
    </div>
  ),
};
