/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotQuoteSalesLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-quote-sales--light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotQuoteSalesLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotQuoteSalesLottieLightStory: Story = {
  name: 'AnimatedSpotQuoteSalesLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotQuoteSalesLottieLight} loop={true} />
    </div>
  ),
};
