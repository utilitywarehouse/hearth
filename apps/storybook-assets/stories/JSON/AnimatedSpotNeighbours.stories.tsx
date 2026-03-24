/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNeighbours from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-neighbours-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotNeighbours',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNeighboursStory: Story = {
  name: 'AnimatedSpotNeighbours',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNeighbours} loop={true} />
    </div>
  ),
};
