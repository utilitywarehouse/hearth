/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotDarkModeLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-dark-mode-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotDarkModeLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotDarkModeLightStory: Story = {
  name: 'AnimatedSpotDarkModeLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotDarkModeLight} loop={true} />
    </div>
  ),
};
