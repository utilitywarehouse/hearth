/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBilling from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-billing-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBilling',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBillingStory: Story = {
  name: 'AnimatedSpotBilling',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBilling} loop={true} />
    </div>
  ),
};
