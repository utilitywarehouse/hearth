/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEarningsDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-earnings-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotEarningsDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEarningsDarkStory: Story = {
  name: 'AnimatedSpotEarningsDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEarningsDark} loop={true} />
    </div>
  ),
};
