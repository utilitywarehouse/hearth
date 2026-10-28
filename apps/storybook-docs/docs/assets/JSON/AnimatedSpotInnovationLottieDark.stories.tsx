/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotInnovationLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-innovation-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotInnovationLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotInnovationLottieDarkStory: Story = {
  name: 'AnimatedSpotInnovationLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotInnovationLottieDark} loop={true} />
    </div>
  ),
};
