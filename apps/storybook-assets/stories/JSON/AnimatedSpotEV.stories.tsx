/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEV from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-ev-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotEV',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEVStory: Story = {
  name: 'AnimatedSpotEV',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEV} loop={true} />
    </div>
  ),
};
