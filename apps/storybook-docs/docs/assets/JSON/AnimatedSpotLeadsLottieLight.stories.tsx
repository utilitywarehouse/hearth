/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotLeadsLottieLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-leads-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotLeadsLottieLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotLeadsLottieLightStory: Story = {
  name: 'AnimatedSpotLeadsLottieLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotLeadsLottieLight} loop={true} />
    </div>
  ),
};
