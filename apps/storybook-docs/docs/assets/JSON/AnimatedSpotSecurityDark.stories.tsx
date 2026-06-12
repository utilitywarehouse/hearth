/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotSecurityDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityDarkStory: Story = {
  name: 'AnimatedSpotSecurityDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityDark} loop={true} />
    </div>
  ),
};
