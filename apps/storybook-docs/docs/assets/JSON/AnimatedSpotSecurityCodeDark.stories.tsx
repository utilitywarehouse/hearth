/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityCodeDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-code-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotSecurityCodeDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityCodeDarkStory: Story = {
  name: 'AnimatedSpotSecurityCodeDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityCodeDark} loop={true} />
    </div>
  ),
};
