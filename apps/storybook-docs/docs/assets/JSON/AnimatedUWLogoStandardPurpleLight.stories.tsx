/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWLogoStandardPurpleLight from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-logo-standard-purple-light.json';

const meta: Meta = {
  title: 'Assets / JSON / AnimatedUWLogoStandardPurpleLight',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWLogoStandardPurpleLightStory: Story = {
  name: 'AnimatedUWLogoStandardPurpleLight',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWLogoStandardPurpleLight} loop={true} />
    </div>
  ),
};
