/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSwitchDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-switch-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotSwitchDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSwitchDarkStory: Story = {
  name: 'AnimatedSpotSwitchDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSwitchDark} loop={true} />
    </div>
  ),
};
