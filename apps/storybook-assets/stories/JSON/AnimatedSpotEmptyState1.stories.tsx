/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEmptyState1 from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-empty-state-1-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotEmptyState1',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEmptyState1Story: Story = {
  name: 'AnimatedSpotEmptyState1',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEmptyState1} loop={true} />
    </div>
  ),
};
