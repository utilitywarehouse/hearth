/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBillingLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-billing-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBillingLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBillingLightStory: Story = {
  name: 'AnimatedSpotBillingLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBillingLight} loop={true} />
    </div>
  ),
};
