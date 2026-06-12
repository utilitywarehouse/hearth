/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEarningsLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-earnings-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotEarningsLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEarningsLightStory: Story = {
  name: 'AnimatedSpotEarningsLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEarningsLight} loop={true} />
    </div>
  ),
};
