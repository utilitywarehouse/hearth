/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotEmptyDarkSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-empty-dark.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotEmptyDark',
};

export default meta;
type Story = StoryObj;

export const SpotEmptyDarkStory: Story = {
  name: 'SpotEmptyDark',
  render: () => (
    <img src={SpotEmptyDarkSrc as unknown as string} alt="SpotEmptyDark" style={{ maxWidth: 320 }} />
  ),
};
