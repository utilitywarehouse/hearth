/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNewLookDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-new-look-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNewLookDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNewLookDarkStory: Story = {
  name: 'AnimatedSpotNewLookDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNewLookDark} loop={true} />
    </div>
  ),
};
