/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNeighboursLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-neighbours-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNeighboursLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNeighboursLottieDarkStory: Story = {
  name: 'AnimatedSpotNeighboursLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNeighboursLottieDark} loop={true} />
    </div>
  ),
};
