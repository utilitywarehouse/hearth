/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotQuoteSalesLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-quote-sales-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotQuoteSalesLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotQuoteSalesLottieDarkStory: Story = {
  name: 'AnimatedSpotQuoteSalesLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotQuoteSalesLottieDark} loop={true} />
    </div>
  ),
};
