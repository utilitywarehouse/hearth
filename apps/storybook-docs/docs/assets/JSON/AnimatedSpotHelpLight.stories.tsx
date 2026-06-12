/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotHelpLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-help-light.json';

const meta: Meta = {
  title: 'Hearth Assets / JSON / AnimatedSpotHelpLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotHelpLightStory: Story = {
  name: 'AnimatedSpotHelpLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotHelpLight} loop={true} />
    </div>
  ),
};
