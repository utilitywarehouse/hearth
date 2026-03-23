/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import Lottie from 'lottie-react';
import UWLogoStandardPurple from '@utilitywarehouse/hearth-json-assets/lib/uw-logo-standard-purple-light.json';

const meta: Meta = {
  title: 'JSON / UWLogoStandardPurple',
};

export default meta;
type Story = StoryObj;

export const UWLogoStandardPurpleStory: Story = {
  name: 'UWLogoStandardPurple',
  render: () => (
    <div style={{ width: 180, height: 140 }}>
      <Lottie animationData={UWLogoStandardPurple} loop={true} />
    </div>
  ),
};
