/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotEmptyState2Dark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-empty-state-2-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotEmptyState2Dark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotEmptyState2DarkStory: Story = {
  name: 'AnimatedSpotEmptyState2Dark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotEmptyState2Dark} loop={true} />
    </div>
  ),
};
