/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHeartDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-heart-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotHeartDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHeartDarkStory: Story = {
  name: 'AnimatedSpotHeartDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHeartDark} loop={true} />
    </div>
  ),
};
