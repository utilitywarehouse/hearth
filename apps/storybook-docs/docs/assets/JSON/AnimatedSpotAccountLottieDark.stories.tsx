/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotAccountLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-account-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotAccountLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotAccountLottieDarkStory: Story = {
  name: 'AnimatedSpotAccountLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotAccountLottieDark} loop={true} />
    </div>
  ),
};
