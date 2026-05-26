/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotWelcomeDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-welcome-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotWelcomeDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotWelcomeDarkStory: Story = {
  name: 'AnimatedSpotWelcomeDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotWelcomeDark} loop={true} />
    </div>
  ),
};
