/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import SpotConfetti from '@utilitywarehouse/hearth-json-assets/lib/spot-confetti-light.json';

const meta: Meta = {
  title: 'JSON / SpotConfetti',
};

export default meta;
type Story = StoryObj;

export const SpotConfettiStory: Story = {
  name: 'SpotConfetti',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={SpotConfetti} loop={true} />
    </div>
  ),
};
