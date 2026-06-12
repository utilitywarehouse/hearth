/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHeartLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-heart-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotHeartLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHeartLightStory: Story = {
  name: 'AnimatedSpotHeartLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHeartLight} loop={true} />
    </div>
  ),
};
