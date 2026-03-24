/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotConfetti from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-confetti-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotConfetti',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotConfettiStory: Story = {
  name: 'AnimatedSpotConfetti',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotConfetti} loop={true} />
    </div>
  ),
};
