/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle2LottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-2--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBundle2LottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle2LottieDarkStory: Story = {
  name: 'AnimatedSpotBundle2LottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle2LottieDark} loop={true} />
    </div>
  ),
};
