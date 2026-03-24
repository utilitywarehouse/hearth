/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotError from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-error-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotError',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotErrorStory: Story = {
  name: 'AnimatedSpotError',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotError} loop={true} />
    </div>
  ),
};
