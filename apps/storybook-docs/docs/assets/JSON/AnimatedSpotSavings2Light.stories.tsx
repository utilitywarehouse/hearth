/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSavings2Light from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-savings-2-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSavings2Light',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSavings2LightStory: Story = {
  name: 'AnimatedSpotSavings2Light',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSavings2Light} loop={true} />
    </div>
  ),
};
