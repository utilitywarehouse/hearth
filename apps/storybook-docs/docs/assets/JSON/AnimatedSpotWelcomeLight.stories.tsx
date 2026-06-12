/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotWelcomeLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-welcome-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedSpotWelcomeLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotWelcomeLightStory: Story = {
  name: 'AnimatedSpotWelcomeLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotWelcomeLight} loop={true} />
    </div>
  ),
};
