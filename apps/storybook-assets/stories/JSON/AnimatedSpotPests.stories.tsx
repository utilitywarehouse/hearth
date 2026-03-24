/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotPests from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-pests-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotPests',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotPestsStory: Story = {
  name: 'AnimatedSpotPests',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotPests} loop={true} />
    </div>
  ),
};
