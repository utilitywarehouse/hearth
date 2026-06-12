/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotQuoteSalesDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-quote-sales-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotQuoteSalesDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotQuoteSalesDarkStory: Story = {
  name: 'AnimatedSpotQuoteSalesDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotQuoteSalesDark} loop={true} />
    </div>
  ),
};
