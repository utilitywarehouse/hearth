/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotLeadsLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-leads-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotLeadsLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotLeadsLottieDarkStory: Story = {
  name: 'AnimatedSpotLeadsLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotLeadsLottieDark} loop={true} />
    </div>
  ),
};
