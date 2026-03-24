/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSuccess from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-success-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSuccess',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSuccessStory: Story = {
  name: 'AnimatedSpotSuccess',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSuccess} loop={true} />
    </div>
  ),
};
