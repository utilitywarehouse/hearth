/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotHeartDarkSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-heart-dark.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotHeartDark',
};

export default meta;
type Story = StoryObj;

export const SpotHeartDarkStory: Story = {
  name: 'SpotHeartDark',
  render: () => (
    <img src={SpotHeartDarkSrc as unknown as string} alt="SpotHeartDark" style={{ maxWidth: 320 }} />
  ),
};
