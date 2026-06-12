/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBoilerDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-boiler-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotBoilerDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBoilerDarkStory: Story = {
  name: 'AnimatedSpotBoilerDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBoilerDark} loop={true} />
    </div>
  ),
};
