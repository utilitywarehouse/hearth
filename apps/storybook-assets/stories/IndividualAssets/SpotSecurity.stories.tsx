/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotSecuritySrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-security.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotSecurity',
};

export default meta;
type Story = StoryObj;

export const SpotSecurityStory: Story = {
  name: 'SpotSecurity',
  render: () => (
    <img src={SpotSecuritySrc as unknown as string} alt="SpotSecurity" style={{ maxWidth: 320 }} />
  ),
};
