/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityCode from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-code-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSecurityCode',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityCodeStory: Story = {
  name: 'AnimatedSpotSecurityCode',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityCode} loop={true} />
    </div>
  ),
};
