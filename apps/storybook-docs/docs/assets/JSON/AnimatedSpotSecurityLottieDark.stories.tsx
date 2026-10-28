/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSecurityLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityLottieDarkStory: Story = {
  name: 'AnimatedSpotSecurityLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityLottieDark} loop={true} />
    </div>
  ),
};
