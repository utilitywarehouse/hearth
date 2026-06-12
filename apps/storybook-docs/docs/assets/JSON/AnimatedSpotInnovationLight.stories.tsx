/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotInnovationLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-innovation-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotInnovationLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotInnovationLightStory: Story = {
  name: 'AnimatedSpotInnovationLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotInnovationLight} loop={true} />
    </div>
  ),
};
