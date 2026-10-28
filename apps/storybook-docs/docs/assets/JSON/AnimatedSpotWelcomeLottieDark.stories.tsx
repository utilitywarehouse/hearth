/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotWelcomeLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-welcome--dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotWelcomeLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotWelcomeLottieDarkStory: Story = {
  name: 'AnimatedSpotWelcomeLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotWelcomeLottieDark} loop={true} />
    </div>
  ),
};
