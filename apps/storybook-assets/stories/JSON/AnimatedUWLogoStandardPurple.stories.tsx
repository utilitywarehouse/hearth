/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import AnimatedUWLogoStandardPurple from '@utilitywarehouse/hearth-json-assets/lib/animated-uw-logo-standard-purple-light.json';

const meta: Meta = {
  title: 'JSON / AnimatedUWLogoStandardPurple',
};

export default meta;
type Story = StoryObj;

export const AnimatedUWLogoStandardPurpleStory: Story = {
  name: 'AnimatedUWLogoStandardPurple',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={AnimatedUWLogoStandardPurple} loop={true} />
    </div>
  ),
};
