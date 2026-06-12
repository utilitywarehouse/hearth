/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotPestsDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-pests-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotPestsDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotPestsDarkStory: Story = {
  name: 'AnimatedSpotPestsDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotPestsDark} loop={true} />
    </div>
  ),
};
