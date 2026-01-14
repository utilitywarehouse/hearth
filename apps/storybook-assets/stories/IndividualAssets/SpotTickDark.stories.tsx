/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotTickDarkSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-tick-dark.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotTickDark',
};

export default meta;
type Story = StoryObj;

export const SpotTickDarkStory: Story = {
  name: 'SpotTickDark',
  render: () => (
    <img src={SpotTickDarkSrc as unknown as string} alt="SpotTickDark" style={{ maxWidth: 320 }} />
  ),
};
