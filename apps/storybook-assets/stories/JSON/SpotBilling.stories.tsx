/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotBilling from '@utilitywarehouse/hearth-json-assets/lib/spot-billing-light.json';

const meta: Meta = {
  title: 'JSON / SpotBilling',
};

export default meta;
type Story = StoryObj;

export const SpotBillingStory: Story = {
  name: 'SpotBilling',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotBilling} loop={true} />
    </div>
  ),
};
