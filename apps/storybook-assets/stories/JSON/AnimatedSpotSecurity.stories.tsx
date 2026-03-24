/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurity from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSecurity',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityStory: Story = {
  name: 'AnimatedSpotSecurity',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurity} loop={true} />
    </div>
  ),
};
