/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCelebratoryLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-celebratory-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotCelebratoryLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCelebratoryLightStory: Story = {
  name: 'AnimatedSpotCelebratoryLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCelebratoryLight} loop={true} />
    </div>
  ),
};
