/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSavings2Dark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-savings-2-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotSavings2Dark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSavings2DarkStory: Story = {
  name: 'AnimatedSpotSavings2Dark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSavings2Dark} loop={true} />
    </div>
  ),
};
