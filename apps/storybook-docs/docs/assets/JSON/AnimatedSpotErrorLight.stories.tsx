/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotErrorLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-error-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotErrorLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotErrorLightStory: Story = {
  name: 'AnimatedSpotErrorLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotErrorLight} loop={true} />
    </div>
  ),
};
