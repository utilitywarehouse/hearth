/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import UWLogoExtendedPurple from '@utilitywarehouse/hearth-json-assets/lib/uw-logo-extended-purple-light.json';

const meta: Meta = {
  title: 'JSON / UWLogoExtendedPurple',
};

export default meta;
type Story = StoryObj;

export const UWLogoExtendedPurpleStory: Story = {
  name: 'UWLogoExtendedPurple',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={UWLogoExtendedPurple} loop={true} />
    </div>
  ),
};
