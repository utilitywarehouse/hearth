/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotBoilerLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-boiler-lottie-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotBoilerLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotBoilerLottieDarkStory: Story = {
  name: 'AnimatedSpotBoilerLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotBoilerLottieDark} loop={true} />
    </div>
  ),
};
