/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotQuoteSalesLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-quote-sales-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotQuoteSalesLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotQuoteSalesLightStory: Story = {
  name: 'AnimatedSpotQuoteSalesLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotQuoteSalesLight} loop={true} />
    </div>
  ),
};
