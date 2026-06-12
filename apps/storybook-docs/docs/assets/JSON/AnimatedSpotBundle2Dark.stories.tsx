/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle2Dark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-2-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBundle2Dark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle2DarkStory: Story = {
  name: 'AnimatedSpotBundle2Dark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle2Dark} loop={true} />
    </div>
  ),
};
