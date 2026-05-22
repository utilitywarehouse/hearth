/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotInnovationDark from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-innovation-dark.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotInnovationDark',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotInnovationDarkStory: Story = {
  name: 'AnimatedSpotInnovationDark',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotInnovationDark} loop={true} />
    </div>
  ),
};
