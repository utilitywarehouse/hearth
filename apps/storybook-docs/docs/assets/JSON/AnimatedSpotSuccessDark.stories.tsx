/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSuccessDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-success-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotSuccessDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSuccessDarkStory: Story = {
  name: 'AnimatedSpotSuccessDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSuccessDark} loop={true} />
    </div>
  ),
};
