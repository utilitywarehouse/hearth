/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNewLookLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-new-look-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNewLookLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNewLookLottieDarkStory: Story = {
  name: 'AnimatedSpotNewLookLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNewLookLottieDark} loop={true} />
    </div>
  ),
};
