/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBoiler from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-boiler-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBoiler',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBoilerStory: Story = {
  name: 'AnimatedSpotBoiler',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBoiler} loop={true} />
    </div>
  ),
};
