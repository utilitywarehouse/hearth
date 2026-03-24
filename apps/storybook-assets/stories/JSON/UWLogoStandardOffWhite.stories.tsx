/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import UWLogoStandardOffWhite from '@utilitywarehouse/hearth-json-assets/lib/uw-logo-standard-off-white-light.json';

const meta: Meta = {
  title: 'JSON / UWLogoStandardOffWhite',
};

export default meta;
type Story = StoryObj;

export const UWLogoStandardOffWhiteStory: Story = {
  name: 'UWLogoStandardOffWhite',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={UWLogoStandardOffWhite} loop={true} />
    </div>
  ),
};
