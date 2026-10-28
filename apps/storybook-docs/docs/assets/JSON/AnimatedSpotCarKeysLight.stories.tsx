/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotCarKeysLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-car-keys-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotCarKeysLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotCarKeysLightStory: Story = {
  name: 'AnimatedSpotCarKeysLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotCarKeysLight} loop={true} />
    </div>
  ),
};
