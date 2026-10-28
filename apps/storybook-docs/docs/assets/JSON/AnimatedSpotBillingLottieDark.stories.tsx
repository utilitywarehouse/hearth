/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBillingLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-billing-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBillingLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBillingLottieDarkStory: Story = {
  name: 'AnimatedSpotBillingLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBillingLottieDark} loop={true} />
    </div>
  ),
};
