/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotSecurityLightSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-security-light.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotSecurityLight',
};

export default meta;
type Story = StoryObj;

export const SpotSecurityLightStory: Story = {
  name: 'SpotSecurityLight',
  render: () => (
    <img src={SpotSecurityLightSrc as unknown as string} alt="SpotSecurityLight" style={{ maxWidth: 320 }} />
  ),
};
