/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBillingDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-billing-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBillingDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBillingDarkStory: Story = {
  name: 'AnimatedSpotBillingDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBillingDark} loop={true} />
    </div>
  ),
};
