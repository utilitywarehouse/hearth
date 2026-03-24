/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWLogoStandardOffWhite from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-logo-standard-off-white-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedUWLogoStandardOffWhite',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWLogoStandardOffWhiteStory: Story = {
  name: 'AnimatedUWLogoStandardOffWhite',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWLogoStandardOffWhite} loop={true} />
    </div>
  ),
};
