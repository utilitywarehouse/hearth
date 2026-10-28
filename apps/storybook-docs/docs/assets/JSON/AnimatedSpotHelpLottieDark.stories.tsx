/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHelpLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-help-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotHelpLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHelpLottieDarkStory: Story = {
  name: 'AnimatedSpotHelpLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHelpLottieDark} loop={true} />
    </div>
  ),
};
