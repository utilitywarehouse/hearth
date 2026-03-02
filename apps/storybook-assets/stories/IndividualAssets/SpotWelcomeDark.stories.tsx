/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotWelcomeDarkSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-welcome-dark.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotWelcomeDark',
};

export default meta;
type Story = StoryObj;

export const SpotWelcomeDarkStory: Story = {
  name: 'SpotWelcomeDark',
  render: () => (
    <img src={SpotWelcomeDarkSrc as unknown as string} alt="SpotWelcomeDark" style={{ maxWidth: 320 }} />
  ),
};
