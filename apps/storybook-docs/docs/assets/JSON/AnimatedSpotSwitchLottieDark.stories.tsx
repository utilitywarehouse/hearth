/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSwitchLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-switch-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSwitchLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSwitchLottieDarkStory: Story = {
  name: 'AnimatedSpotSwitchLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSwitchLottieDark} loop={true} />
    </div>
  ),
};
