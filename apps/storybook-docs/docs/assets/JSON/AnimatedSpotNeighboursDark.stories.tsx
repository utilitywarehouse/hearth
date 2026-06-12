/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNeighboursDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-neighbours-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNeighboursDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNeighboursDarkStory: Story = {
  name: 'AnimatedSpotNeighboursDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNeighboursDark} loop={true} />
    </div>
  ),
};
