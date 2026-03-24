/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWLogoExtendedOffWhite from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-logo-extended-off-white-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedUWLogoExtendedOffWhite',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWLogoExtendedOffWhiteStory: Story = {
  name: 'AnimatedUWLogoExtendedOffWhite',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWLogoExtendedOffWhite} loop={true} />
    </div>
  ),
};
