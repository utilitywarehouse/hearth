/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCarKeysDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-car-keys-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotCarKeysDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCarKeysDarkStory: Story = {
  name: 'AnimatedSpotCarKeysDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCarKeysDark} loop={true} />
    </div>
  ),
};
