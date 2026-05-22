/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotPestsLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-pests-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotPestsLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotPestsLightStory: Story = {
  name: 'AnimatedSpotPestsLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotPestsLight} loop={true} />
    </div>
  ),
};
