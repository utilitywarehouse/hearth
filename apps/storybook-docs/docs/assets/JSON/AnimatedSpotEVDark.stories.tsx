/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEVDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-ev-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotEVDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEVDarkStory: Story = {
  name: 'AnimatedSpotEVDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEVDark} loop={true} />
    </div>
  ),
};
