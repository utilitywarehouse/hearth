/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotNeighbours from '@utilitywarehouse/hearth-json-assets/lib/spot-neighbours-light.json';

const meta: Meta = {
  title: 'JSON / SpotNeighbours',
};

export default meta;
type Story = StoryObj;

export const SpotNeighboursStory: Story = {
  name: 'SpotNeighbours',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotNeighbours} loop={true} />
    </div>
  ),
};
