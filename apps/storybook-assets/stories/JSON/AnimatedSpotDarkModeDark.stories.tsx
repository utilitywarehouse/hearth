/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotDarkModeDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-dark-mode-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotDarkModeDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotDarkModeDarkStory: Story = {
  name: 'AnimatedSpotDarkModeDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotDarkModeDark} loop={true} />
    </div>
  ),
};
