/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCelebratoryLottieDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-celebratory-dark.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotCelebratoryLottieDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCelebratoryLottieDarkStory: Story = {
  name: 'AnimatedSpotCelebratoryLottieDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCelebratoryLottieDark} loop={true} />
    </div>
  ),
};
