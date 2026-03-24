/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotDarkMode from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-dark-mode-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotDarkMode',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotDarkModeStory: Story = {
  name: 'AnimatedSpotDarkMode',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotDarkMode} loop={true} />
    </div>
  ),
};
