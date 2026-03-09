/* Don't edit this file directly, it was auto generated */
import type { Meta, StoryObj } from '@storybook/react';
import SpotQuoteDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-quote-dark.svg';

const meta: Meta = {
  title: 'Individual SVG Assets/SpotQuoteDark',
};

export default meta;
type Story = StoryObj;

export const SpotQuoteDarkStory: Story = {
  name: 'SpotQuoteDark',
  render: () => (
    <img src={SpotQuoteDark as unknown as string} alt="SpotQuoteDark" style={{ maxWidth: 320 }} />
  ),
};
