/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSecurityLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityLightStory: Story = {
  name: 'AnimatedSpotSecurityLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityLight} loop={true} />
    </div>
  ),
};
