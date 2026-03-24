/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSwitch from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-switch-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSwitch',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSwitchStory: Story = {
  name: 'AnimatedSpotSwitch',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSwitch} loop={true} />
    </div>
  ),
};
