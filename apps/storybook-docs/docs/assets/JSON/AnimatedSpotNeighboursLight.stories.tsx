/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNeighboursLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-neighbours-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotNeighboursLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNeighboursLightStory: Story = {
  name: 'AnimatedSpotNeighboursLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNeighboursLight} loop={true} />
    </div>
  ),
};
