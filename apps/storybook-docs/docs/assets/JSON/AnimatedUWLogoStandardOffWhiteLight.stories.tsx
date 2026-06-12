/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWLogoStandardOffWhiteLight from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-logo-standard-off-white-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedUWLogoStandardOffWhiteLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWLogoStandardOffWhiteLightStory: Story = {
  name: 'AnimatedUWLogoStandardOffWhiteLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWLogoStandardOffWhiteLight} loop={true} />
    </div>
  ),
};
