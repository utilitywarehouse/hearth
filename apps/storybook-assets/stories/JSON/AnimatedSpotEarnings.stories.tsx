/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEarnings from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-earnings-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotEarnings',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEarningsStory: Story = {
  name: 'AnimatedSpotEarnings',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEarnings} loop={true} />
    </div>
  ),
};
