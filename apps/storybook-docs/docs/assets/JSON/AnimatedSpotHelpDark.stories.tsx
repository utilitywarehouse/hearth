/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHelpDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-help-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotHelpDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHelpDarkStory: Story = {
  name: 'AnimatedSpotHelpDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHelpDark} loop={true} />
    </div>
  ),
};
