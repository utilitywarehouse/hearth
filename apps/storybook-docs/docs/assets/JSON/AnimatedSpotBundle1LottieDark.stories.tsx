/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBundle1LottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-bundle-1-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBundle1LottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBundle1LottieDarkStory: Story = {
  name: 'AnimatedSpotBundle1LottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBundle1LottieDark} loop={true} />
    </div>
  ),
};
