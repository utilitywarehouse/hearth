/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBoilerLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-boiler-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBoilerLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBoilerLightStory: Story = {
  name: 'AnimatedSpotBoilerLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBoilerLight} loop={true} />
    </div>
  ),
};
