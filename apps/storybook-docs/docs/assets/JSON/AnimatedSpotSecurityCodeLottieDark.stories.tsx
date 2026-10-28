/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityCodeLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-code--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSecurityCodeLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityCodeLottieDarkStory: Story = {
  name: 'AnimatedSpotSecurityCodeLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityCodeLottieDark} loop={true} />
    </div>
  ),
};
