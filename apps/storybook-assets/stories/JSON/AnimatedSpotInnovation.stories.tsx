/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotInnovation from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-innovation-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotInnovation',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotInnovationStory: Story = {
  name: 'AnimatedSpotInnovation',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotInnovation} loop={true} />
    </div>
  ),
};
