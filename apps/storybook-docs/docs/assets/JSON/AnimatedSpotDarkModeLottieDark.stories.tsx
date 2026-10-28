/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotDarkModeLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-dark-mode-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotDarkModeLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotDarkModeLottieDarkStory: Story = {
  name: 'AnimatedSpotDarkModeLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotDarkModeLottieDark} loop={true} />
    </div>
  ),
};
