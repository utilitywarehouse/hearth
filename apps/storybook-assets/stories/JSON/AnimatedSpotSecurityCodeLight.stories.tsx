/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedSpotSecurityCodeLight from '@utilitywarehouse/hearth-json-assets/lib/animated-spot-security-code-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedSpotSecurityCodeLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedSpotSecurityCodeLightStory: Story = {
  name: 'AnimatedSpotSecurityCodeLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedSpotSecurityCodeLight} loop={true} />
    </div>
  ),
};
