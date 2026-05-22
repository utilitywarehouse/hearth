/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEmptyState1Light from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-empty-state-1-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotEmptyState1Light',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEmptyState1LightStory: Story = {
  name: 'AnimatedSpotEmptyState1Light',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEmptyState1Light} loop={true} />
    </div>
  ),
};
