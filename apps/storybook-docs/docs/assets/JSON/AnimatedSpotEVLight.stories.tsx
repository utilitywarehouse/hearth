/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEVLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-ev-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotEVLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEVLightStory: Story = {
  name: 'AnimatedSpotEVLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEVLight} loop={true} />
    </div>
  ),
};
