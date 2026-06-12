/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNewLookLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-new-look-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotNewLookLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNewLookLightStory: Story = {
  name: 'AnimatedSpotNewLookLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNewLookLight} loop={true} />
    </div>
  ),
};
