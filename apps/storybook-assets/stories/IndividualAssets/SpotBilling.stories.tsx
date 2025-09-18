/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotBillingSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotBilling',
};

export default meta;
type Story = StoryObj;

export const SpotBillingStory: Story = {
  name: 'SpotBilling',
  render: () => (
    <img src={SpotBillingSrc as unknown as string} alt="SpotBilling" style={{ maxWidth: 320 }} />
  ),
};
