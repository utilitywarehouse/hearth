/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSecurityLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityLottieLightStory: Story = {
  name: 'AnimatedSpotSecurityLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityLottieLight} loop={true} />
    </div>
  ),
};
