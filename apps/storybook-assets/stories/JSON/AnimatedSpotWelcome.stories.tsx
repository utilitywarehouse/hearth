/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotWelcome from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-welcome-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotWelcome',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotWelcomeStory: Story = {
  name: 'AnimatedSpotWelcome',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotWelcome} loop={true} />
    </div>
  ),
};
