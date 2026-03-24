/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotQuoteSales from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-quote-sales-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotQuoteSales',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotQuoteSalesStory: Story = {
  name: 'AnimatedSpotQuoteSales',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotQuoteSales} loop={true} />
    </div>
  ),
};
