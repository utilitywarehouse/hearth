/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotBoilerDarkSrc from '@utilitywarehouse/hearth-svg-assets/lib/spot-boiler-dark.svg';

const meta: Meta = {
  title: 'Individual Assets/SpotBoilerDark',
};

export default meta;
type Story = StoryObj;

export const SpotBoilerDarkStory: Story = {
  name: 'SpotBoilerDark',
  render: () => (
    <img src={SpotBoilerDarkSrc as unknown as string} alt="SpotBoilerDark" style={{ maxWidth: 320 }} />
  ),
};
