/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEmptyState2Light from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-empty-state-2-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotEmptyState2Light',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEmptyState2LightStory: Story = {
  name: 'AnimatedSpotEmptyState2Light',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEmptyState2Light} loop={true} />
    </div>
  ),
};
