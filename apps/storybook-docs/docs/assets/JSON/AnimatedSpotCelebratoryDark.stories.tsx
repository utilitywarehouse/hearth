/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCelebratoryDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-celebratory-dark.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotCelebratoryDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCelebratoryDarkStory: Story = {
  name: 'AnimatedSpotCelebratoryDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCelebratoryDark} loop={true} />
    </div>
  ),
};
