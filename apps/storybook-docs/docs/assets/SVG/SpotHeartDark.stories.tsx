/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotHeartDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-heart-dark.svg';

const meta: Meta = {
  title: 'Hearth Assets / SVG / SpotHeartDark',
};

export default meta;
type Story = StoryObj;

export const SpotHeartDarkStory: Story = {
  name: 'SpotHeartDark',
  render: () => (
    <img src={SpotHeartDark as unknown as string} alt="SpotHeartDark" style={{ maxWidth: 320 }} />
  ),
};
