/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEmptyState2 from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-empty-state-2-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotEmptyState2',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEmptyState2Story: Story = {
  name: 'AnimatedSpotEmptyState2',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEmptyState2} loop={true} />
    </div>
  ),
};
