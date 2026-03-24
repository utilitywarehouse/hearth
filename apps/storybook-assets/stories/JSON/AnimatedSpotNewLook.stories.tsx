/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotNewLook from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-new-look-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotNewLook',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotNewLookStory: Story = {
  name: 'AnimatedSpotNewLook',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotNewLook} loop={true} />
    </div>
  ),
};
