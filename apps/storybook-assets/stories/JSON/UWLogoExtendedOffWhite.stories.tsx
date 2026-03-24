/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import UWLogoExtendedOffWhite from '@utilitywarehouse/hearth-json-assets/lib/uw-logo-extended-off-white-light.json';

const meta: Meta = {
  title: 'JSON / UWLogoExtendedOffWhite',
};

export default meta;
type Story = StoryObj;

export const UWLogoExtendedOffWhiteStory: Story = {
  name: 'UWLogoExtendedOffWhite',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={UWLogoExtendedOffWhite} loop={true} />
    </div>
  ),
};
