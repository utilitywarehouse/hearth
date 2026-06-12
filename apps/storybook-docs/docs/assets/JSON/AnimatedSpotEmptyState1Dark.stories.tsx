/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEmptyState1Dark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-empty-state-1-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotEmptyState1Dark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEmptyState1DarkStory: Story = {
  name: 'AnimatedSpotEmptyState1Dark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEmptyState1Dark} loop={true} />
    </div>
  ),
};
