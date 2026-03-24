/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCelebratory from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-celebratory-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotCelebratory',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCelebratoryStory: Story = {
  name: 'AnimatedSpotCelebratory',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCelebratory} loop={true} />
    </div>
  ),
};
