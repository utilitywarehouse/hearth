/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWLogoExtendedPurple from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-logo-extended-purple-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedUWLogoExtendedPurple',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWLogoExtendedPurpleStory: Story = {
  name: 'AnimatedUWLogoExtendedPurple',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWLogoExtendedPurple} loop={true} />
    </div>
  ),
};
