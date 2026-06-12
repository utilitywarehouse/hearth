/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotErrorDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-error-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotErrorDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotErrorDarkStory: Story = {
  name: 'AnimatedSpotErrorDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotErrorDark} loop={true} />
    </div>
  ),
};
