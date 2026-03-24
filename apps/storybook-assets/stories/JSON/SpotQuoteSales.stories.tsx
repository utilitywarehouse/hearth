/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotQuoteSales from '@utilitywarehouse/hearth-json-assets/lib/spot-quote-sales-light.json';

const meta: Meta = {
  title: 'JSON / SpotQuoteSales',
};

export default meta;
type Story = StoryObj;

export const SpotQuoteSalesStory: Story = {
  name: 'SpotQuoteSales',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotQuoteSales} loop={true} />
    </div>
  ),
};
