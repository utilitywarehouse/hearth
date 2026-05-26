/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle1Dark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-1-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotBundle1Dark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle1DarkStory: Story = {
  name: 'AnimatedSpotBundle1Dark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle1Dark} loop={true} />
    </div>
  ),
};
