/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotNeighboursSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-neighbours.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotNeighbours',
};

export default meta;
type Story = StoryObj;

export const SpotNeighboursStory: Story = {
  name: 'SpotNeighbours',
  render: () => (
    <img src={SpotNeighboursSrc as unknown as string} alt="SpotNeighbours" style={{ maxWidth: 320 }} />
  ),
};
