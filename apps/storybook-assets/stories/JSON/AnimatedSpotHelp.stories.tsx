/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHelp from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-help-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotHelp',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHelpStory: Story = {
  name: 'AnimatedSpotHelp',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHelp} loop={true} />
    </div>
  ),
};
