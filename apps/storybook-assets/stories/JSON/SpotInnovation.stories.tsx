/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotInnovation from '@utilitywarehouse/hearth-json-assets/lib/spot-innovation-light.json';

const meta: Meta = {
  title: 'JSON / SpotInnovation',
};

export default meta;
type Story = StoryObj;

export const SpotInnovationStory: Story = {
  name: 'SpotInnovation',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotInnovation} loop={true} />
    </div>
  ),
};
