/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotPestsLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-pests-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotPestsLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotPestsLottieDarkStory: Story = {
  name: 'AnimatedSpotPestsLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotPestsLottieDark} loop={true} />
    </div>
  ),
};
